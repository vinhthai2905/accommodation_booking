from rest_framework import serializers

from apps.app_hotel.models import KhachSan, ChinhSachTreEm
from apps.app_hotel.helpers import get_full_address

class ChildPolicyPreviewSerializer(serializers.ModelSerializer):
    """Serialize the child policy belongs to a hotel, then expose to public API."""

    class Meta:
        model = ChinhSachTreEm
        fields = [
            "max_free_age",
            "max_surcharge_age",
            "adult_age_from",
            "surcharge_amount",
        ]

class HotelBookingPreviewSerializer(serializers.ModelSerializer):
    """Serialize hotel data for booking purposes, then expose it to public API."""

    primary_image = serializers.SerializerMethodField()
    full_address = serializers.SerializerMethodField()
    child_policy = ChildPolicyPreviewSerializer(read_only=True)

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

    def get_primary_image(self, hotel: KhachSan):
        primary_image = hotel.hotel_images.filter(is_primary=True).first()
        return primary_image.url if primary_image else None

    def get_full_address(self, hotel: KhachSan):
        return get_full_address(hotel)
