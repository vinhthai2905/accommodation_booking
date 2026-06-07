from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from django.utils import timezone
from django.db.transaction import atomic

from apps.common.permission.user_permissions import IsCustomer
from apps.common.helpers import get_booking

from apps.app_booking.models import DatPhong, ThanhToan
from apps.app_booking.api.public.bookings_users.serializers.booking_cancel_serializers import (
    BookingCancelSerializer,
)

from logs.write_API_logs import api_logger

from apps.app_hotel.models import ChinhSachHoanTien
from apps.app_payment.services import ZaloPayRefundService

from uuid import UUID
from decimal import Decimal
from datetime import datetime, timezone as dt_timezone


class BookingCancellationService:
    @classmethod
    def get_free_cancellation_or_penalty(
        cls,
        payment_record: ThanhToan,
        booking: DatPhong,
        refund_policy: ChinhSachHoanTien,
    ):
        free_cancellation_milli = refund_policy.free_cancellation_minutes * 60 * 1000
        booking_created_at_milli = int(booking.created_at.timestamp() * 1000)
        free_cancellation_expires_at_milli = (
            booking_created_at_milli + free_cancellation_milli
        )
        
        free_cancellation_expires_at = datetime.fromtimestamp(
            free_cancellation_expires_at_milli / 1000.0, tz=dt_timezone.utc
        )

        if timezone.now() < free_cancellation_expires_at:
            return int(payment_record.paid_amount)

        days_before_checkin = (booking.check_in_date - timezone.localdate()).days
        amount_percentage_left = (
            Decimal("100.00") - refund_policy.penalty_percentage
        )

        if days_before_checkin <= refund_policy.days_before_arrival_penalty:
            return int(
                payment_record.paid_amount
                * (amount_percentage_left / Decimal("100.00"))
            )
            
        return int(payment_record.paid_amount)

    @classmethod
    def calculate_penalty_amount(cls, payment_record: ThanhToan, booking: DatPhong):
        refund_policy: ChinhSachHoanTien = booking.id_hotel.refund_policy

        return cls.get_free_cancellation_or_penalty(payment_record, booking, refund_policy)

    @classmethod
    def dispatch_refund_request(cls, payment_record: ThanhToan, booking: DatPhong):
        refund_amount = cls.calculate_penalty_amount(payment_record, booking)

        return ZaloPayRefundService.refund(
            app_trans_id=payment_record.id_transaction_service,
            amount=refund_amount,
            description=f"Hoàn tiền hủy phòng {str(booking.id_booking)[:8].upper()}",
        )

    @classmethod
    def update_payment_record(cls, refund_result, updated_booking, serializer):
        if refund_result.get("return_code") in [1, 3]:
            serializer.update(updated_booking, "Success")
        else:
            serializer.update(updated_booking, "Failed")

        return updated_booking, refund_result

    @classmethod
    def cancel_booking(
        cls, serializer: BookingCancelSerializer, booking: DatPhong, user
    ):
        updated_booking = serializer.update(booking, "Processing")
        payment_record = booking.invoice.payments

        refund_result = cls.dispatch_refund_request(payment_record, booking)

        return cls.update_payment_record(refund_result, updated_booking, serializer)


class BookingCancelView(APIView):
    permission_classes = [IsCustomer]

    def _log_refund_params(self, id_booking, refund_result):
        refund_params = refund_result.pop("refund_params", None)
        
        if refund_params:
            api_logger.info(f"[ZALOPAY REFUND STATUS PARAMS] Booking {id_booking}: {refund_params}")

    def _build_response_data(self, refund_result):
        response_data = {"message": "Booking has been processing for refund."}

        if refund_result.get("return_code") not in [1, 3]:
            response_data["refund_result"] = refund_result

        return response_data

    def patch(self, request: Request, id_booking: UUID, *args, **kwargs):
        booking = get_booking(id_booking, request.user)

        serializer = BookingCancelSerializer(
            instance=booking, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        
        _, refund_result = BookingCancellationService.cancel_booking(
            serializer, booking, request.user
        )

        self._log_refund_params(id_booking, refund_result)

        response_data = self._build_response_data(refund_result)

        return Response(response_data, status=status.HTTP_200_OK)
