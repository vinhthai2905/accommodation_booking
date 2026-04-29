from rest_framework import serializers

from apps.app_hotel.models import LoaiPhong

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