from django.db import transaction
from django.utils import timezone

from uuid import UUID

from rest_framework import views, status, exceptions
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_booking.api.permission import UserIsCustomer
from apps.app_booking.api.public.bookings_users.serializers import (
    IDBookingConfirmationSerializer,
    BookingConfirmationDetailSerializer,
)
from apps.app_booking.models import DatPhong, ThanhToan
from apps.app_booking.choices import TrangThaiDatPhong, TrangThaiThanhToan

from apps.app_payment.services.zalo import ZaloPayService
from apps.app_payment.api.exceptions.zalo import ZaloPaymentGatewayException


class BookingConfirmationView(views.APIView):
    permission_classes = [UserIsCustomer]
    serializer_class = IDBookingConfirmationSerializer

    def _validate_id_booking_path_params(self, id_booking) -> UUID:
        serializer = IDBookingConfirmationSerializer(data={"id_booking": id_booking})
        serializer.is_valid(raise_exception=True)

        return serializer.validated_data["id_booking"]

    def _get_booking(self, id_booking) -> DatPhong:
        try:
            booking = DatPhong.objects.select_related("invoice__payments").get(
                id_booking=id_booking
            )
        except Exception as e:
            raise exceptions.NotFound(
                detail={"error": "Booking wasn't found with the given ID."}
            )
        return booking

    def _get_zalo_status_order_service(self, booking: DatPhong) -> dict:
        id_transaction = booking.invoice.payments.id_transaction_service

        try:
            zalo_transaction_status = ZaloPayService.get_order_status(id_transaction)
        except Exception as e:
            raise ZaloPaymentGatewayException(detail={"error": e})

        return zalo_transaction_status

    def _update_booking_payment(self, booking: DatPhong, zalo_transaction_status: dict):
        booking_payment: ThanhToan = booking.invoice.payments
        order_code = zalo_transaction_status["return_code"]

        match order_code:
            case 1:
                booking_payment.paid_at = timezone.now()
                booking_payment.status = TrangThaiThanhToan.PAID
                booking.status = TrangThaiDatPhong.CONFIRMED
            case 3:
                return booking_payment

        booking_payment.save()
        booking.save()

        return booking_payment

    def get(self, request: Request, id_booking, *args, **kwargs):
        validated_id_booking = self._validate_id_booking_path_params(id_booking)

        try:
            with transaction.atomic():
                booking = self._get_booking(validated_id_booking)

                zalo_transaction_status = self._get_zalo_status_order_service(booking)
                booking_payment = self._update_booking_payment(
                    booking, zalo_transaction_status
                )

                return Response(
                    {
                        **zalo_transaction_status,
                        "booking_details": BookingConfirmationDetailSerializer(
                            instance=booking
                        ).data,
                    },
                    status=status.HTTP_200_OK,
                )

        except exceptions.APIException as e:
            raise e
