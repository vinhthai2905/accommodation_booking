from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import KhachSan
from apps.app_hotel.model.tien_nghi_models import TienNghiKhachSan, LoaiTienNghi
from apps.app_hotel.api.private.partner_hotel_detail.serializers.hotel_type_amenities_serializers import (
    PartnerHotelAmenitySerializer,
    LoaiTienNghiSerializer
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner,
)
from apps.common.permission import IsAuthenticatedUserActive

class BasePartnerHotelAmenityView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

class PartnerHotelAmenityListView(BasePartnerHotelAmenityView):
    def get(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        amenities = TienNghiKhachSan.objects.filter(id_hotel=hotel).select_related('id_amenity_type', 'id_amenity_type__id_amenity_category')
        serializer = PartnerHotelAmenitySerializer(amenities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        
        id_amenity_type = request.data.get('id_amenity_type')
        name = request.data.get('name')
        
        if name:
            id_amenity_category = request.data.get('id_amenity_category')
            scope = request.data.get('scope', 'room')
            slug = request.data.get('slug')
            if not slug:
                slug = name.lower().replace(' ', '-')
            
            loai_tien_nghi, created = LoaiTienNghi.objects.get_or_create(
                name__iexact=name,
                defaults={
                    'name': name,
                    'id_amenity_category_id': id_amenity_category,
                    'scope': scope,
                    'slug': slug
                }
            )
            id_amenity_type = loai_tien_nghi.id_amenity_type

        if not id_amenity_type:
            return Response({"error": "Vui lòng chọn hoặc nhập loại tiện nghi."}, status=status.HTTP_400_BAD_REQUEST)
            
        if TienNghiKhachSan.objects.filter(id_hotel=hotel, id_amenity_type=id_amenity_type).exists():
            return Response({"error": "Tiện ích này đã tồn tại trong khách sạn của bạn."}, status=status.HTTP_400_BAD_REQUEST)
            
        payload = {'id_amenity_type': id_amenity_type}
        serializer = PartnerHotelAmenitySerializer(data=payload)
        if serializer.is_valid():
            serializer.save(id_hotel=hotel)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PartnerHotelAmenityDetailView(BasePartnerHotelAmenityView):
    def delete(self, request: Request, id_hotel_amenity: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        try:
            amenity = TienNghiKhachSan.objects.get(id_hotel=hotel, id_hotel_amenity=id_hotel_amenity)
            amenity.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TienNghiKhachSan.DoesNotExist:
            raise exceptions.NotFound(detail={"error": "Amenity not found or does not belong to your hotel."})

class AvailableAmenityTypeListView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]

    def get(self, request: Request, *args, **kwargs):
        amenities = LoaiTienNghi.objects.all().select_related('id_amenity_category')
        serializer = LoaiTienNghiSerializer(amenities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args, **kwargs):
        serializer = LoaiTienNghiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AvailableAmenityTypeDetailView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]

    def _get_amenity(self, id_amenity_type: int) -> LoaiTienNghi:
        try:
            return LoaiTienNghi.objects.get(id_amenity_type=id_amenity_type)
        except LoaiTienNghi.DoesNotExist:
            raise exceptions.NotFound(detail={"error": "Amenity type not found."})

    def put(self, request: Request, id_amenity_type: int, *args, **kwargs):
        amenity = self._get_amenity(id_amenity_type)
        serializer = LoaiTienNghiSerializer(amenity, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, id_amenity_type: int, *args, **kwargs):
        amenity = self._get_amenity(id_amenity_type)
        amenity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
