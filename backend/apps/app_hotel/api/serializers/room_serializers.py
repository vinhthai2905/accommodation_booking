from rest_framework import serializers

from apps.app_hotel.models import PhongKhachSan, LoaiPhong


class RoomTypeSerializer(serializers.ModelSerializer):
    rooms = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = LoaiPhong
        fields = [
            "id_room_type", 
            "id_hotel", 
            "type_name",
            "max_capacity",
            "total_rooms",
            "price",
            "rooms"
        ]

class HotelRoomSerializer(serializers.ModelSerializer):
    room_type = serializers.CharField(source="id_room_type.type_name", read_only=True)
    hotel_name = serializers.CharField(source="id_room_type.id_hotel.name", read_only=True)
    
    class Meta:
        model = PhongKhachSan
        fields = ["id_room", "id_room_type", "room_name", "room_type", "hotel_name"]