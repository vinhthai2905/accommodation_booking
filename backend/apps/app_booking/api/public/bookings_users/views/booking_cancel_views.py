from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, exceptions

from apps.app_booking.models import DatPhong
from apps.app_booking.api.public.bookings_users.serializers.booking_cancel_serializers import BookingCancelSerializer
from apps.app_booking.api.permission import UserIsCustomer

class BookingCancelView(APIView):
    permission_classes = [UserIsCustomer]

    def _get_booking(self, id_booking, user):
        try:
            return DatPhong.objects.get(id_booking=id_booking, id_user=user)
        except DatPhong.DoesNotExist:
            raise exceptions.NotFound("Booking not found.")

    def patch(self, request: Request, id_booking, *args, **kwargs):
        booking = self._get_booking(id_booking, request.user)

        serializer = BookingCancelSerializer(instance=booking, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "Booking has been successfully cancelled."}, 
            status=status.HTTP_200_OK
        )
