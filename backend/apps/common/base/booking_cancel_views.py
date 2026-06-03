from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, exceptions

from django.utils import timezone

from apps.common.permission.user_permissions import IsCustomer
from apps.common.helpers import get_booking

from apps.app_booking.models import DatPhong, ThanhToan
from apps.app_booking.api.public.bookings_users.serializers.booking_cancel_serializers import BookingCancelSerializer

from apps.app_hotel.models import ChinhSachHoanTien
from apps.app_payment.services import ZaloPayRefundService

from uuid import UUID
from decimal import Decimal

class BookingCancellationService:
    @classmethod
    def calculate_penalty_amount(cls,payment_record: ThanhToan, booking: DatPhong):
        refund_policy: ChinhSachHoanTien = booking.id_hotel.refund_policy
        days_before_checkin = (
            booking.check_in_date - timezone.localdate()

        ).days
        
        # 30% khi test khach san hien tai 
        amount_percentage_left = Decimal('100.00') - refund_policy.penalty_percentage 
        
        if days_before_checkin <= refund_policy.days_before_arrival_penalty:
            return int(payment_record.paid_amount * (amount_percentage_left / Decimal('100.00')))
        
        return int(payment_record.paid_amount)
    
    @classmethod
    def dispatch_refund_request(cls, payment_record: ThanhToan, booking: DatPhong):
        refund_amount = cls.calculate_penalty_amount(payment_record, booking)
        
        return ZaloPayRefundService.refund(
            app_trans_id=payment_record.id_transaction_service,
            amount=refund_amount,
            description=f"Hoàn tiền hủy phòng {str(booking.id_booking)[:8].upper()}"
        )
    
    @classmethod
    def update_payment_record(cls, refund_result, updated_booking, serializer):
        if refund_result.get("return_code") in [1, 3]:
            serializer.update(updated_booking, "Success")
        else:
            serializer.update(updated_booking, "Failed")
        
        return updated_booking   
    
    @classmethod
    def cancel_booking(
        cls, 
        serializer: BookingCancelSerializer, 
        booking: DatPhong, 
        user
    ):
        updated_booking = serializer.update(booking, "Processing")
        payment_record = booking.invoice.payments
        
        refund_result = cls.dispatch_refund_request(payment_record, booking)

        return cls.update_payment_record(refund_result, updated_booking, serializer)

class BookingCancelView(APIView):
    permission_classes = [IsCustomer]
    
    def patch(self, request: Request, id_booking: UUID, *args, **kwargs):
        booking = get_booking(id_booking, request.user)

        serializer = BookingCancelSerializer(instance=booking, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        BookingCancellationService.cancel_booking(serializer, booking, request.user)

        return Response(
            {"message": "Booking has been processing for refund."}, 
            status=status.HTTP_200_OK
        )
