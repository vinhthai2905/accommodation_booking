from rest_framework import serializers

from apps.app_hotel.models import PhongKhachSan

class RoomTypeRoomsSerializer(serializers.ModelSerializer):
    hotel_name = serializers.CharField(
        source="id_room_type.id_hotel.name", read_only=True
    )

    class Meta:
        model = PhongKhachSan
        fields = ["id_room", "room_name", "hotel_name", "status"]
        

class RoomBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhongKhachSan
        fields = ["id_room", "room_name"]