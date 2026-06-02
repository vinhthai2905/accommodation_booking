from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, exceptions

from apps.common.permission.user_permissions import IsCustomer
from apps.common.helpers import get_booking

from apps.app_booking.models import DatPhong
from apps.app_booking.api.public.bookings_users.serializers.booking_cancel_serializers import BookingCancelSerializer

from apps.app_payment.services import ZaloPayRefundService

from uuid import UUID

class BookingCancellationService:
    @classmethod
    def cancel_booking(
        cls, 
        serializer: BookingCancelSerializer, 
        booking: DatPhong, 
        user
    ):
        updated_booking = serializer.update(booking, "Processing")
        
        payment_record = booking.invoice.payments
        
        refund_result = ZaloPayRefundService.refund(
            app_trans_id=payment_record.id_transaction_service,
            amount=int(payment_record.paid_amount),
            description=f"Hoàn tiền hủy phòng {str(booking.id_booking)[:8].upper()}"
        )

        if refund_result.get("return_code") in [1, 3]:
            serializer.update(updated_booking, "Success")
            
            from apps.app_hotel.models import PhongKhachSan
            PhongKhachSan.objects.filter(booking_details__id_booking=booking).update(
                status=PhongKhachSan.RoomStatus.AVAILABLE
            )
        else:
            serializer.update(updated_booking, "Failed")

        return updated_booking

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
