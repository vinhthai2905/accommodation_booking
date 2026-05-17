from rest_framework import serializers

from apps.app_hotel.model.danh_muc_tien_nghi_models import DanhMucTienNghi
from apps.app_hotel.model.tien_nghi_models import LoaiTienNghi, TienNghiKhachSan

class DanhMucTienNghiSerializer(serializers.ModelSerializer):
    class Meta:
        model = DanhMucTienNghi
        fields = ["id_amenity_category", "name", "slug"]

class LoaiTienNghiSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="id_amenity_category.name", read_only=True)
    
    class Meta:
        model = LoaiTienNghi
        fields = ["id_amenity_type", "name", "scope", "slug", "id_amenity_category", "category_name"]

class PartnerHotelAmenitySerializer(serializers.ModelSerializer):
    amenity_name = serializers.CharField(source="id_amenity_type.name", read_only=True)
    id_amenity_category = serializers.IntegerField(source="id_amenity_type.id_amenity_category.id_amenity_category", read_only=True)
    category_name = serializers.CharField(source="id_amenity_type.id_amenity_category.name", read_only=True)
    scope = serializers.CharField(source="id_amenity_type.scope", read_only=True)
    
    class Meta:
        model = TienNghiKhachSan
        fields = ["id_hotel_amenity", "id_amenity_type", "id_amenity_category", "amenity_name", "category_name", "scope"]
        read_only_fields = ["id_hotel_amenity"]
