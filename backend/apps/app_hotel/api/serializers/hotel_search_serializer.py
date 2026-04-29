from rest_framework import serializers

from apps.app_hotel.models import KhachSan
from apps.app_hotel.helpers import get_full_address

class HotelSearchParamsSerializer(serializers.Serializer):
    check_in = serializers.DateField(input_formats=["%d-%m-%Y"], required=True)
    check_out = serializers.DateField(input_formats=["%d-%m-%Y"], required=True)
    location = serializers.CharField(required=True)
    requested_rooms = serializers.IntegerField(min_value=1, required=True)
    adults = serializers.IntegerField(min_value=1, required=True)
    children = serializers.IntegerField(min_value=0, required=False, default=0)
    children_ages = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=17),
        required=False,
        default=list
)
    
class HotelSearchSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(write_only=True, required=False)
    longitude = serializers.FloatField(write_only=True, required=False)
    primary_image = serializers.SerializerMethodField()
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
            "primary_image",
            "latitude",
            "longitude",
        ]
        extra_kwargs = {
            "id_user": {"write_only": True},
        }

    def get_primary_image(self, obj: KhachSan):
        primary_image = obj.hotel_images.filter(is_primary=True).first()
        return primary_image.url if primary_image else None

    def get_full_address(self, obj: KhachSan):
        return get_full_address(obj)