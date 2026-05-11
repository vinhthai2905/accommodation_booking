from django.db.models import QuerySet

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from apps.app_user.models import NguoiDung

from apps.app_hotel.models import LoaiPhong, KhachSan
from apps.app_hotel.api.private.partner_hotel_detail.serializers import (
    RoomTypeSerializer,
)
from apps.app_hotel.api.permissions import IsAuthenticatedPartner, IsAuthenticatedPartnerActive


class PartnerRoomTypeListView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = RoomTypeSerializer
    
    def _get_hotel_room_types(self, hotel: KhachSan) ->  QuerySet[LoaiPhong]:
        room_types: QuerySet[LoaiPhong] = hotel.room_types.all()
        
        return room_types
    
    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return (
                KhachSan.objects
                .prefetch_related("room_types")
                .get(id_user=partner)
            )
        except KhachSan.DoesNotExist as e:
            raise exceptions.NotFound(
                detail=({
                    "error": "Partner have not yet registered a hotel."
                })
            )
            

    def get(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room_types = self._get_hotel_room_types(hotel)
        
        room_type_serializer = self.serializer_class(room_types, many=True)
        
        return Response(room_type_serializer.data, status=status.HTTP_200_OK)
     