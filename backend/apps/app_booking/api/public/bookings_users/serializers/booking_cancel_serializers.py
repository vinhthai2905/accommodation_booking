from rest_framework import serializers

from apps.app_booking.models import DatPhong
from apps.app_booking.choices import TrangThaiDatPhong

class BookingCancelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatPhong
        fields = ['status']
        read_only_fields = ['status']
        
    def validate(self, attrs):
        if self.instance.status == TrangThaiDatPhong.CANCELLED:
            raise serializers.ValidationError("Booking is already cancelled.")
            
        if self.instance.status == TrangThaiDatPhong.CONFIRMED:
            raise serializers.ValidationError("Cannot cancel a completed booking.")
            
        return attrs

    def update(self, instance, validated_data):
        instance.status = TrangThaiDatPhong.CANCELLED
        instance.save(update_fields=["status", "updated_at"])
        return instance
