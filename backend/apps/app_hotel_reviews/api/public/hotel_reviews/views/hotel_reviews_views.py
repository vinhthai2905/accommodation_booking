from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from ..serializers.hotel_reviews_serializers import HotelReviewListSerializer
from apps.app_hotel.model.danh_gia_models import DanhGiaKhachSan

class HotelReviewListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, id_hotel, *args, **kwargs):
        reviews = DanhGiaKhachSan.objects.filter(
            id_booking__id_hotel=id_hotel
        ).select_related('id_user', 'id_user__personal_info').order_by('-created_at')
        
        serializer = HotelReviewListSerializer(reviews, many=True)
        return Response(serializer.data)
