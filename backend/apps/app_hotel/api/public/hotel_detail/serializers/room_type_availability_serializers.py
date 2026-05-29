from rest_framework import serializers
from rest_framework import exceptions

from apps.app_hotel.models import LoaiPhong, PhongKhachSan
from helpers.validate_booking_date import validate_booking_date

class BookingDateSerializer(serializers.Serializer):
    """Deserialize requested date range."""
    
    check_in = serializers.DateField(
        input_formats=["%d-%m-%Y"], required=True
    )
    check_out = serializers.DateField(
        input_formats=["%d-%m-%Y"], required=True
    )

    def validate(self, attrs):
        validate_booking_date(attrs)
        return attrs


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

class RoomTypeAvailabilitySerializer(serializers.ModelSerializer):
    """Serialize each room type with its available rooms for the resquested date range, 
    then expose it to the public API."""
    
    available_rooms = serializers.SerializerMethodField()

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

    def get_available_rooms(self, obj: LoaiPhong):
        booked_room_ids_set = self.context.get("booked_room_ids")
        
        if booked_room_ids_set is None:
            raise exceptions.APIException(
                "Missing booked_room_ids in serializer context."
            )

        rooms = [
            room
            for room in obj.rooms.all()
            if room.id_room not in booked_room_ids_set
        ]

        return (
            RoomAvailabilitySerializer(instance=rooms, many=True)
            .data
        )
        
