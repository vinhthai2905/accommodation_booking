from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import LoaiPhong, KhachSan, Giuong, ChiTietLoaiPhong
from apps.app_hotel.api.private.partner_hotel_detail.serializers import (
    BedSerializer,
    RoomTypeDetailSerializer,
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner,
    IsAuthenticatedPartnerActive,
)

class PartnerBedListView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = BedSerializer

    def get(self, request: Request, *args, **kwargs):
        beds = Giuong.objects.all()
        serializer = self.serializer_class(beds, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PartnerRoomTypeDetailView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = RoomTypeDetailSerializer

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def _get_room_type(self, hotel: KhachSan, id_room_type: int) -> LoaiPhong:
        try:
            return LoaiPhong.objects.get(
                id_room_type=id_room_type, id_hotel=hotel
            )
        except LoaiPhong.DoesNotExist:
            raise exceptions.NotFound(
                detail={
                    "error": "Room type not found or does not belong to your hotel."
                }
            )

    def get(self, request: Request, id_room_type: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room_type = self._get_room_type(hotel, id_room_type)
        details = room_type.bed_details.select_related("id_bed").all()

        serializer = self.serializer_class(details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, id_room_type: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room_type = self._get_room_type(hotel, id_room_type)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(id_room_type=room_type)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PartnerRoomTypeDetailItemView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def _get_room_type(self, hotel: KhachSan, id_room_type: int) -> LoaiPhong:
        try:
            return LoaiPhong.objects.get(
                id_room_type=id_room_type, id_hotel=hotel
            )
        except LoaiPhong.DoesNotExist:
            raise exceptions.NotFound(
                detail={
                    "error": "Room type not found or does not belong to your hotel."
                }
            )

    def delete(self, request: Request, id_room_type: int, id_room_type_detail: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        room_type = self._get_room_type(hotel, id_room_type)

        try:
            detail = ChiTietLoaiPhong.objects.get(
                id_room_type_detail=id_room_type_detail,
                id_room_type=room_type
            )
            detail.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ChiTietLoaiPhong.DoesNotExist:
            raise exceptions.NotFound(detail={"error": "Bed detail not found."})
