from rest_framework import serializers
from apps.app_hotel.models import Giuong, ChiTietLoaiPhong


class BedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Giuong
        fields = ["id", "name", "max_capacity", "size"]


class RoomTypeDetailSerializer(serializers.ModelSerializer):
    bed_name = serializers.CharField(source="id_bed.name", read_only=True)
    bed_size = serializers.CharField(source="id_bed.size", read_only=True)
    bed_max_capacity = serializers.IntegerField(source="id_bed.max_capacity", read_only=True)

    class Meta:
        model = ChiTietLoaiPhong
        fields = [
            "id_room_type_detail",
            "id_room_type",
            "id_bed",
            "bed_quantity",
            "bed_name",
            "bed_size",
            "bed_max_capacity",
        ]
        read_only_fields = ["id_room_type"]
