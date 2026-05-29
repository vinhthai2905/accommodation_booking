from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from django.db.models import QuerySet

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import LoaiPhong, KhachSan, PhongKhachSan
from apps.app_hotel.api.private.partner_hotel_detail.serializers import (
    RoomTypeRoomsSerializer,
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner,
)
from apps.common.permission import IsAuthenticatedUserActive


class PartnerRoomTypeRoomsListView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]
    serializer_class = RoomTypeRoomsSerializer

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

    def post(self, request: Request, id_room_type: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room_type = self._get_room_type(hotel, id_room_type)
        
        room_name = request.data.get("room_name")
        if not room_name:
            return Response(
                {"error": "Tên phòng không được để trống."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        current_rooms_count = room_type.rooms.count()
        if room_type.total_rooms is not None and current_rooms_count >= room_type.total_rooms:
            return Response(
                {"error": f"Không thể thêm phòng mới. Số lượng phòng hiện tại ({current_rooms_count}) đã đạt hoặc vượt quá giới hạn tổng số phòng ({room_type.total_rooms})."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        new_room = PhongKhachSan.objects.create(
            id_room_type=room_type,
            room_name=room_name
        )
        
        serializer = self.serializer_class(new_room)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class PartnerRoomDetailView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = RoomTypeRoomsSerializer

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def _get_room(self, hotel: KhachSan, id_room: int) -> PhongKhachSan:
        try:
            return PhongKhachSan.objects.get(
                id_room=id_room, id_room_type__id_hotel=hotel
            )
        except PhongKhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={
                    "error": "Room not found or does not belong to your hotel."
                }
            )

    def put(self, request: Request, id_room: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room = self._get_room(hotel, id_room)
        
        room_name = request.data.get("room_name")
        status_val = request.data.get("status")
        
        if not room_name:
            return Response(
                {"error": "Tên phòng không được để trống."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        room.room_name = room_name
        if status_val:
            room.status = status_val
            
        room.save()
        
        serializer = self.serializer_class(room)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request: Request, id_room: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room = self._get_room(hotel, id_room)
        
        room.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)