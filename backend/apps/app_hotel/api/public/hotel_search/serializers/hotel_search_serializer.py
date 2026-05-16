from rest_framework import serializers

from apps.app_hotel.models import KhachSan
from apps.app_hotel.helpers import get_full_address
from apps.app_hotel.api.public.hotel_detail.serializers import BookingDateSerializer


class HotelSearchParamsSerializer(BookingDateSerializer):
    """Deserialize hotel search query params."""

    location = serializers.CharField(required=True)
    requested_rooms = serializers.IntegerField(min_value=1, required=True)
    adults = serializers.IntegerField(min_value=1, required=True)
    children = serializers.IntegerField(min_value=0, required=False, default=0)
    children_ages = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=17),
        required=False,
        default=list,
    )

    def _get_effective_total_guests(self, attrs):
        if attrs["children"] > 0:
            attrs["requested_total_guests"] = attrs["adults"] + attrs["children"]
        else:
            attrs["requested_total_guests"] = attrs["adults"]

    def validate(self, attrs):
        self._get_effective_total_guests(attrs)

        return attrs


class HotelSearchResultSerializer(serializers.ModelSerializer):
    """Serialize each hotel which met the search requirements,
    then expose to public API Search Hotels."""

    primary_image = serializers.SerializerMethodField()
    full_address = serializers.SerializerMethodField()

    class Meta:
        model = KhachSan
        fields = [
            "id_hotel",
            "id_hotel_type",
            "id_ward",
            "name",
            "slug",
            "full_address",
            "primary_image",
        ]
        read_only_fields = [
            "id_hotel",
            "id_hotel_type",
            "id_ward",
            "name",
            "slug",
        ]

    def get_primary_image(self, obj: KhachSan):
        primary_image = obj.hotel_images.filter(is_primary=True).first()
        return primary_image.url if primary_image else None

    def get_full_address(self, obj: KhachSan):
        return get_full_address(obj)
