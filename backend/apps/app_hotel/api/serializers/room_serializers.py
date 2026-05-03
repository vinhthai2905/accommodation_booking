from rest_framework import serializers

from apps.app_hotel.models import PhongKhachSan

class RoomSerializer(serializers.ModelSerializer):
    room_type = serializers.CharField(source="id_room_type.type_name", read_only=True)
    hotel_name = serializers.CharField(
        source="id_room_type.id_hotel.name", read_only=True
    )

    class Meta:
        model = PhongKhachSan
        fields = ["id_room", "id_room_type", "room_name", "room_type", "hotel_name"]


class RoomAvailabilitySerializer(serializers.ModelSerializer):
    """Serialize each available room belongs to a specific room type for the request date range, 
    then expose to public API."""
    
    room_type = serializers.CharField(source="id_room_type.type_name", read_only=True)

    class Meta:
        model = PhongKhachSan
        fields = ["id_room", "id_room_type", "room_type", "room_name"]
        read_only_fields = [
            "id_room",
            "id_room_type",
            "room_name",
        ]
