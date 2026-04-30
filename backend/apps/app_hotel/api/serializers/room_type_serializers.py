from rest_framework import serializers
from rest_framework import exceptions

from apps.app_hotel.models import LoaiPhong
from apps.app_hotel.api.serializers.room_serializers import (
    HotelRoomAvailabilitySerializer
)


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


class RoomAvailabilitySerializer(serializers.ModelSerializer):
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
            HotelRoomAvailabilitySerializer(instance=rooms, many=True)
            .data
        )