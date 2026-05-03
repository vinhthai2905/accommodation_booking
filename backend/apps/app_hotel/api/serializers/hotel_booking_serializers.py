from rest_framework import serializers

from apps.app_hotel.models import KhachSan
from apps.app_hotel.helpers import get_full_address
from apps.app_hotel.api.serializers.child_policy_serializers import ChildPolicySummarySerializer

class HotelBookingSerializer(serializers.ModelSerializer):
    """Serialize hotel data for booking purposes, then expose it to public API."""

    primary_image = serializers.SerializerMethodField()
    full_address = serializers.SerializerMethodField()
    child_policy = ChildPolicySummarySerializer(read_only=True)

    class Meta:
        model = KhachSan
        fields = [
            "id_hotel",
            "name",
            "full_address",
            "primary_image",
            "child_policy",
        ]
        read_only_fields = fields

    def get_primary_image(self, obj: KhachSan):
        primary_image = obj.hotel_images.filter(is_primary=True).first()
        return primary_image.url if primary_image else None

    def get_full_address(self, obj: KhachSan):
        return get_full_address(obj)
