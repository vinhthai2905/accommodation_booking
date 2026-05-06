from django.db import transaction

from rest_framework import views, status, exceptions
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_booking.api.permission import UserIsCustomer
from apps.app_booking.api.serializers import BookingConfirmationSerializer
from apps.app_payment.services.zalo import ZaloPayService
from apps.app_booking.models import DatPhong, HoaDon

class BookingConfirmationView(views.APIView):
    permission_classes=[UserIsCustomer]
    serializer_class = BookingConfirmationSerializer
    
    def _validate_booking_path_params(self, data):
        serializer = BookingConfirmationSerializer(data=data)
        serializer.is_valid(raise_exception=True)
    
    def get(self, request: Request, *args, **kwargs):
        self._validate_booking_path_params(request.data)
        
        
        try:
            with transaction.atomic():
            # booking = DatPhong.objects.select_related("id_hotel", "id_user").get(
            #     id_booking=id_booking
            # )

            # invoice = HoaDon.objects.filter(id_booking=booking).first()
            
                app_trans_id="260506_#230E3B68B6"
                test = ZaloPayService.get_order_status(app_trans_id)
                

                return Response(
                    {
                       **test
                    },
                    status=status.HTTP_200_OK,
                )

        except DatPhong.DoesNotExist:
            raise exceptions.NotFound({"error": "Booking not found."})
