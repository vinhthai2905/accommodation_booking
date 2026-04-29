from rest_framework import serializers

from apps.app_hotel.models import KhachSan
from apps.app_hotel.api.serializers.image_serializers import PublicHotelImageSerializer
from apps.app_hotel.helpers import get_full_address

class HotelSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(write_only=True, required=False)
    longitude = serializers.FloatField(write_only=True, required=False)
    hotel_images = PublicHotelImageSerializer(many=True, read_only=True)
    full_address = serializers.SerializerMethodField()

    class Meta:
        model = KhachSan
        fields = [
            "id_hotel",
            "id_hotel_type",
            "id_user",
            "id_ward",
            "slug",
            "name",
            "full_address",
            "hotel_images",
            "latitude",
            "longitude",
        ]
        extra_kwargs = {
            "id_user": {"write_only": True},
        }

    def get_full_address(self, obj: KhachSan):
        return get_full_address(obj)
