from rest_framework import serializers

from apps.app_hotel.models import KhachSan


class HotelSerializer(serializers.ModelSerializer):
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
        ward_name = obj.id_ward.ward_name
        city_name = obj.id_ward.id_city.city_name
        return f'{obj.address}, {ward_name}, {city_name}' if ward_name and city_name else None