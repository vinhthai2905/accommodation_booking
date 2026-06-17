from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request

from rest_framework import status

from apps.common.base import HotelBaseView
from apps.app_hotel_reviews.api.public.user_reviews.serializers import UserCreateReviewSerializer
from apps.app_hotel.model.danh_gia_models import DanhGiaKhachSan

class UserCreateReviewView(HotelBaseView):
    permission_classes = [IsAuthenticated]
    
    def _get_validation_raw_data(self, request: Request, id_booking):
        rawData = {}
        
        rawData["id_user"] = request.user.id_user
        rawData["id_booking"] = id_booking
        rawData["content"] = request.data["content"]
        rawData["rating"] = request.data["rating"]
        
        return rawData

    def post(self, request, id_booking, *args, **kwargs):
        rawData = self._get_validation_raw_data(request, id_booking)

        serializer = UserCreateReviewSerializer(data=rawData)
        serializer.is_valid(raise_exception=True)
        serializer.create_review(serializer.validated_data)
        
        return Response(
            data={"message: Booking review has been submitted!"},
            status=status.HTTP_201_CREATED
        )
