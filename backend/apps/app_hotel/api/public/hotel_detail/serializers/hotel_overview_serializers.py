from rest_framework import serializers

from apps.app_hotel.models import KhachSan, TienNghiKhachSan, HinhAnhKhachSan
from apps.app_hotel.helpers import get_full_address

class PublicHotelImageSerializer(serializers.ModelSerializer):
    """Serialize each image belongs to a hotel, then expose it to public API."""
    
    class Meta:
        model = HinhAnhKhachSan
        fields = [
            "id_hotel_image",
            "image_name",
            "is_primary",
            "url",
        ]
        read_only_fields = fields
        
class HotelDetailSerializer(serializers.ModelSerializer):
    """Serialize a hotel, then expose it to public API."""
    
    hotel_images = PublicHotelImageSerializer(many=True, read_only=True)
    full_address = serializers.SerializerMethodField()

    class Meta:
        model = KhachSan
        fields = [
            "id_hotel",
            "id_hotel_type",
            "id_ward",
            "slug",
            "name",
            "full_address",
            "hotel_images",
        ]
        read_only_fields = fields

    def get_full_address(self, obj: KhachSan):
        return get_full_address(obj)

class HotelAmenitiesSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="id_amenity_type.name")

    class Meta:
        model = TienNghiKhachSan
        fields = ["id_hotel_amenity", "name"]

