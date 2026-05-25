from rest_framework import serializers
from apps.app_hotel.models import LoaiTienNghi

class HotelFilterCountSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField(read_only=True)

    class Meta:
        model = LoaiTienNghi
        fields = [
            "id_amenity_type",
            "name",
            "scope",
            "slug",
            "count",
        ]
        read_only_fields = [
            "id_amenity_type",
            "name",
            "scope",
            "slug",
            "count",
        ]
