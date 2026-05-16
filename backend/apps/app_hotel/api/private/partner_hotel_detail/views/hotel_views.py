from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import KhachSan
from apps.app_hotel.api.private.partner_hotel_detail.serializers.hotel_serializers import (
    PartnerHotelSerializer,
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner,
    IsAuthenticatedPartnerActive,
)


class PartnerHotelView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = PartnerHotelSerializer

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def get(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        serializer = self.serializer_class(hotel)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        serializer = self.serializer_class(hotel, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
