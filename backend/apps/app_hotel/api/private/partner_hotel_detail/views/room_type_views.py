from django.db.models import QuerySet

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from apps.app_user.models import NguoiDung

from apps.app_hotel.api.views.base import PartnerHotelViewMixin
from apps.app_hotel.models import LoaiPhong, KhachSan, PhongKhachSan
from apps.app_hotel.api.private.partner_hotel_detail.serializers import (
    RoomTypeSerializer,
    RoomTypeCreateSerializer,
    RoomTypeUpdateSerializer,
)
from apps.app_hotel.api.permissions import IsAuthenticatedPartner, IsAuthenticatedPartnerActive


class PartnerRoomTypeListView(PartnerHotelViewMixin, APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = RoomTypeSerializer

    def _get_hotel_room_types(self, hotel: KhachSan) -> QuerySet[LoaiPhong]:
        return hotel.room_types.all()

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner have not yet registered a hotel."}
            )

    def get(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room_types = self._get_hotel_room_types(hotel)

        room_type_serializer = self.serializer_class(room_types, many=True)
        return Response(room_type_serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)

        deserializer = RoomTypeCreateSerializer(data=request.data)
        deserializer.is_valid(raise_exception=True)

        new_room_type = LoaiPhong.objects.create(
            id_hotel=hotel,
            **deserializer.validated_data,
        )

        serializer = self.serializer_class(new_room_type)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PartnerRoomTypeView(PartnerHotelViewMixin, APIView):
    """Handles update (PUT/PATCH) for a single room type."""
    
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = RoomTypeSerializer
    
    def get(self, request: Request, id_room_type: int, *args, **kwargs):
        room_type = self.get_partner_room_type(request.user, id_room_type)
        serializer = self.serializer_class(room_type)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request, id_room_type: int, *args, **kwargs):
        room_type = self.get_partner_room_type(request.user, id_room_type)

        deserializer = RoomTypeUpdateSerializer(data=request.data)
        deserializer.is_valid(raise_exception=True)

        deserializer.update(room_type, deserializer.validated_data)

        serializer = self.serializer_class(room_type)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, id_room_type: int, *args, **kwargs):
        return self.put(request, id_room_type, *args, **kwargs)
    
    def delete(self, request: Request, id_room_type: int, *args, **kwargs):
        room_type = self.get_partner_room_type(request.user, id_room_type)

        room_type.delete()

        return Response(
            {"detail": "Room type deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )