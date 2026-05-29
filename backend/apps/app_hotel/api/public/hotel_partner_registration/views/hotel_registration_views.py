from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from apps.app_hotel.models import LoaiKhachSan, DonDangKyKhachSan
from apps.app_hotel.api.public.hotel_partner_registration.serializers import (
    LoaiKhachSanSerializer,
    DonDangKyKhachSanSerializer
)

class HotelTypeListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoaiKhachSanSerializer
    queryset = LoaiKhachSan.objects.all().order_by("id")

class PartnerHotelRegistrationView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DonDangKyKhachSanSerializer
    queryset = DonDangKyKhachSan.objects.all()

    def get(self, request, *args, **kwargs):
        registration = DonDangKyKhachSan.objects.filter(id_user=request.user).order_by("-created_at").first()
        if not registration:
            return Response({"status": None}, status=status.HTTP_200_OK)
        serializer = self.get_serializer(registration)
        return Response(serializer.data, status=status.HTTP_200_OK)
