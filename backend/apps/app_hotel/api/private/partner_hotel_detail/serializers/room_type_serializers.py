from rest_framework import serializers
from rest_framework import exceptions

from apps.app_hotel.models import LoaiPhong, PhongKhachSan


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
        ]


class RoomTypeCreateSerializer(serializers.Serializer):
    type_name = serializers.CharField(max_length=100)
    max_capacity = serializers.IntegerField(min_value=1)
    total_rooms = serializers.IntegerField(min_value=0)
    price = serializers.DecimalField(max_digits=12, decimal_places=2)


class RoomTypeUpdateSerializer(serializers.Serializer):
    type_name = serializers.CharField(max_length=100, required=False)
    price = serializers.DecimalField(max_digits=12, decimal_places=2, required=False)
    
    
    def update(self, instance: LoaiPhong, validated_data):
        instance.type_name = validated_data.get(
            "type_name",
            instance.type_name
        )

        instance.price = validated_data.get(
            "price",
            instance.price
        )
        
        instance.save()

        return instance