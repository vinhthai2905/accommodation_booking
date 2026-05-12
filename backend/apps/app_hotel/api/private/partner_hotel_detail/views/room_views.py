from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from django.db.models import QuerySet

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import LoaiPhong, KhachSan, PhongKhachSan
from apps.app_hotel.api.private.partner_hotel_detail.serializers import (
    RoomSerializer,
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner,
    IsAuthenticatedPartnerActive,
)


class PartnerRoomView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = RoomSerializer

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def _get_room_type(self, hotel: KhachSan, id_room_type: int) -> LoaiPhong:
        try:
            return LoaiPhong.objects.prefetch_related("rooms").get(
                id_room_type=id_room_type, id_hotel=hotel
            )
        except LoaiPhong.DoesNotExist:
            raise exceptions.NotFound(
                detail={
                    "error": "Room type not found or does not belong to your hotel."
                }
            )

    def _get_rooms(self, room_type: LoaiPhong) -> QuerySet[PhongKhachSan]:
        return room_type.rooms.all()

    def get(self, request: Request, id_room_type: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room_type = self._get_room_type(hotel, id_room_type)
        rooms = self._get_rooms(room_type)

        serializer = self.serializer_class(rooms, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
