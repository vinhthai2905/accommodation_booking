from django.db.models import QuerySet

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from apps.app_user.models import NguoiDung

from apps.app_hotel.api.base.base import PartnerHotelViewMixin
from apps.app_hotel.models import LoaiPhong, KhachSan, Giuong, ChiTietLoaiPhong
from apps.app_hotel.api.private.partner_hotel_detail.serializers import (
    BedSerializer,
    RoomTypeDetailsSerializer,
    RoomTypeDetailCreateSerializer
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner
)
from apps.common.permission import IsAuthenticatedUserActive

class PartnerBedListView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]
    serializer_class = BedSerializer

    def get(self, request: Request, *args, **kwargs):
        beds = Giuong.objects.all()
        serializer = self.serializer_class(beds, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PartnerRoomTypeDetailsListView(PartnerHotelViewMixin, APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]
    serializer_class = RoomTypeDetailsSerializer
    deserializer_class = RoomTypeDetailCreateSerializer
    
    def _get_room_type_details(self, room_type: LoaiPhong) -> QuerySet[ChiTietLoaiPhong]:
        return room_type.bed_details.select_related("id_bed").all()

    def get(self, request: Request, id_room_type: int, *args, **kwargs):
        room_type = self.get_partner_room_type(request.user, id_room_type)
        room_type_details = self._get_room_type_details(room_type)

        serializer = self.serializer_class(room_type_details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args, **kwargs):
        room_type = self.get_partner_room_type(request.user, kwargs["id_room_type"])
        
        deserializer = self.deserializer_class(data=request.data)
        deserializer.is_valid(raise_exception=True)
        new_room_type_detail = deserializer.create_room_type_detail(room_type, deserializer.validated_data)
        
        serializer = self.serializer_class(new_room_type_detail)
        
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class PartnerRoomTypeDetailView(PartnerHotelViewMixin, APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]

    def delete_detail_item(self, room_type: LoaiPhong, id_room_type_detail_bed: int):
        try:
            room_type_detail = ChiTietLoaiPhong.objects.get(
                id_room_type_detail=id_room_type_detail_bed, id_room_type=room_type
            )

            room_type_detail.delete()

        except ChiTietLoaiPhong.DoesNotExist:
            raise exceptions.NotFound(detail={"error": "Detail room not found."})

    def delete(self, request: Request, *args, **kwargs):
        room_type = self.get_partner_room_type(request.user, kwargs["id_room_type"])

        self.delete_detail_item(room_type, kwargs["id_room_type_detail"])

        return Response(status=status.HTTP_204_NO_CONTENT)
