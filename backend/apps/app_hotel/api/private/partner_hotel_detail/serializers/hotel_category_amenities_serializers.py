from rest_framework import serializers

from apps.app_hotel.model.tien_nghi_models import TienNghiKhachSan
from apps.app_hotel.model.danh_muc_tien_nghi_models import DanhMucTienNghi

class HotelCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DanhMucTienNghi
        fields = ["id_amenity_category", "name", "slug"]

class HotelCategoryAmenitiesSerializer(serializers.ModelSerializer):
    amenity_name = serializers.CharField(source="id_amenity_type.name", read_only=True)
    id_amenity_category = serializers.IntegerField(source="id_amenity_type.id_amenity_category.id_amenity_category", read_only=True)
    category_name = serializers.CharField(source="id_amenity_type.id_amenity_category.name", read_only=True)
    scope = serializers.CharField(source="id_amenity_type.scope", read_only=True)
    hotel_name = serializers.CharField(source="id_hotel.name", read_only=True)

    class Meta:
        model = TienNghiKhachSan
        fields = ["id_hotel_amenity", "id_amenity_type", "id_amenity_category", "amenity_name", "category_name", "scope", "hotel_name"]
        read_only_fields = ["id_hotel_amenity"]
