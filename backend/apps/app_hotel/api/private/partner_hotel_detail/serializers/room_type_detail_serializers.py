from rest_framework import serializers, exceptions
from apps.app_hotel.models import Giuong, ChiTietLoaiPhong, LoaiPhong


class MixinIDSerializer(serializers.Serializer):
    id_room_type = serializers.IntegerField(required=False)
    id_room_type_detail = serializers.IntegerField(required=False)


class BedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Giuong
        fields = ["id_bed", "name", "max_capacity", "size"]


class RoomTypeDetailCreateSerializer(serializers.Serializer):
    bed_quantity = serializers.IntegerField()
    id_bed = serializers.IntegerField()

    def validate_id_bed(self, id_bed: int):
        try:
            return Giuong.objects.get(id_bed=id_bed)
        except Giuong.DoesNotExist:
            raise exceptions.NotFound(detail={"error": "The input bed does not exist."})

    def _get_existin_room_type_detail(self, room_type: LoaiPhong, id_bed) -> ChiTietLoaiPhong:
        existing_detail = ChiTietLoaiPhong.objects.filter(
            id_room_type=room_type, id_bed=id_bed
        ).first()

        return existing_detail

    def create_room_type_detail(self, room_type: LoaiPhong, validated_data):
        existing_detail = self._get_existin_room_type_detail(
            room_type,
            validated_data["id_bed"],
        )

        if existing_detail:
            existing_detail.bed_quantity += validated_data["bed_quantity"]
            existing_detail.save()

            return existing_detail

        return ChiTietLoaiPhong.objects.create(
            id_room_type=room_type,
            id_bed=validated_data["id_bed"],
            bed_quantity=validated_data["bed_quantity"],
        )


class RoomTypeDetailsSerializer(serializers.ModelSerializer):
    bed_name = serializers.CharField(source="id_bed.name", read_only=True)
    bed_size = serializers.CharField(source="id_bed.size", read_only=True)
    bed_max_capacity = serializers.IntegerField(
        source="id_bed.max_capacity", read_only=True
    )

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
