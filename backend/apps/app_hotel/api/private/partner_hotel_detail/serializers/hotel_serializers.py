from rest_framework import serializers

from apps.app_hotel.models import KhachSan
from apps.app_hotel.model.hinh_anh_models import HinhAnhKhachSan

class HotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HinhAnhKhachSan
        fields = ["id_hotel_image", "image_name", "url", "is_primary"]

class PartnerHotelSerializer(serializers.ModelSerializer):
    hotel_images = HotelImageSerializer(many=True, read_only=True)

    class Meta:
        model = KhachSan
        fields = ["id_hotel", "name", "address", "slug", "hotel_images"]
        read_only_fields = ["id_hotel", "slug", "hotel_images"]
