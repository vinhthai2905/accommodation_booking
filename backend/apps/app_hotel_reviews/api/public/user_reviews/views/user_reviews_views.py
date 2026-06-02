from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..serializers.user_reviews_serializers import UserCreateReviewSerializer
from apps.app_hotel.model.danh_gia_models import DanhGiaKhachSan

class UserCreateReviewView(generics.CreateAPIView):
    serializer_class = UserCreateReviewSerializer
    permission_classes = [IsAuthenticated]
