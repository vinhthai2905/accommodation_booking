from rest_framework import serializers

from apps.app_hotel.model.hinh_anh_models import HinhAnhKhachSan

class PartnerHotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HinhAnhKhachSan
        fields = ["id_hotel_image", "image_name", "url", "is_primary", "slug"]
        read_only_fields = ["id_hotel_image", "slug"]
