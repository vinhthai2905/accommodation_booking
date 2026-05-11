from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import exceptions

from uuid import UUID

from apps.app_hotel.api.public.hotel_detail.serializers import HotelDetailSerializer
from apps.app_hotel.models import KhachSan

class HotelDetailView(APIView):
    serializer_class = HotelDetailSerializer
    hotel_model = KhachSan
    
    def get(self, request: Request, id_hotel: UUID):
        try:
            hotel = self.hotel_model.objects.get(id_hotel=id_hotel)
        except self.hotel_model.DoesNotExist:
            raise exceptions.NotFound("Hotel not found.")
        
        serializer = self.serializer_class(instance=hotel)
        
        return Response(serializer.data)