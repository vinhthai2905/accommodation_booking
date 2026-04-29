from rest_framework import serializers

from apps.app_hotel.models import HinhAnhKhachSan

class PublicHotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HinhAnhKhachSan
        fields = [
            "id_hotel_image",
            "image_name",
            "is_primary",
            "url",
        ]
        read_only_fields = fields