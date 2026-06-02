from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.common.base import HotelBaseView
from apps.app_hotel_reviews.api.public.user_reviews.serializers import UserCreateReviewSerializer
from apps.app_hotel.model.danh_gia_models import DanhGiaKhachSan

class UserCreateReviewView(HotelBaseView):
    permission_classes = [IsAuthenticated]
    
    def _get_validation_raw_data(self, rawData, id_booking):
        rawData["id_booking"] = id_booking
        
        return rawData

    def post(self, request, id_booking, *args, **kwargs):
        rawData = self._get_validation_raw_data(request.data, id_booking)

        serializer = UserCreateReviewSerializer(data=rawData, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
