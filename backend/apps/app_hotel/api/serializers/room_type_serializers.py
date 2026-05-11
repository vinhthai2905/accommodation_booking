from rest_framework import serializers
from rest_framework import exceptions

from apps.app_hotel.models import LoaiPhong

class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoaiPhong
        fields = [
            "id_room_type",
            "id_hotel",
            "type_name",
            "max_capacity",
            "total_rooms",
            "price",
            "available_rooms",
        ]
