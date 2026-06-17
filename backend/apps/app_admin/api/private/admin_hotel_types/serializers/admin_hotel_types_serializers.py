from rest_framework import serializers
from apps.app_hotel.model.khach_san_models import LoaiKhachSan

class AdminHotelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoaiKhachSan
        fields = ['id', 'name', 'slug']
