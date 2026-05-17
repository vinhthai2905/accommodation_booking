from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from django.db.models import QuerySet

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import KhachSan
from apps.app_hotel.model.tien_nghi_models import TienNghiKhachSan, DanhMucTienNghi
from apps.app_hotel.api.private.partner_hotel_detail.serializers.hotel_category_amenities_serializers import (
    HotelCategoryAmenitiesSerializer,
    HotelCategorySerializer,
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner,
    IsAuthenticatedPartnerActive,
)


class PartnerHotelCategoryAmenitiesListView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = HotelCategoryAmenitiesSerializer

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def _get_amenity_category(self, id_amenity_category: int) -> DanhMucTienNghi:
        try:
            return DanhMucTienNghi.objects.get(id_amenity_category=id_amenity_category)
        except DanhMucTienNghi.DoesNotExist:
            raise exceptions.NotFound(
                detail={
                    "error": "Amenity category not found."
                }
            )

    def _get_amenities(self, hotel: KhachSan, category: DanhMucTienNghi) -> QuerySet[TienNghiKhachSan]:
        return TienNghiKhachSan.objects.filter(
            id_hotel=hotel,
            id_amenity_type__id_amenity_category=category
        ).select_related('id_amenity_type', 'id_amenity_type__id_amenity_category')

    def get(self, request: Request, id_amenity_category: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        category = self._get_amenity_category(id_amenity_category)
        amenities = self._get_amenities(hotel, category)

        serializer = self.serializer_class(amenities, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class PartnerHotelCategoryListView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = HotelCategorySerializer

    def get(self, request: Request, *args, **kwargs):
        categories = DanhMucTienNghi.objects.all()
        serializer = self.serializer_class(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PartnerHotelCategoryDetailView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = HotelCategorySerializer

    def _get_category(self, id_amenity_category: int) -> DanhMucTienNghi:
        try:
            return DanhMucTienNghi.objects.get(id_amenity_category=id_amenity_category)
        except DanhMucTienNghi.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Amenity category not found."}
            )

    def get(self, request: Request, id_amenity_category: int, *args, **kwargs):
        category = self._get_category(id_amenity_category)
        serializer = self.serializer_class(category)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request, id_amenity_category: int, *args, **kwargs):
        category = self._get_category(id_amenity_category)
        serializer = self.serializer_class(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, id_amenity_category: int, *args, **kwargs):
        category = self._get_category(id_amenity_category)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

