from rest_framework import serializers

from django.utils import timezone

from apps.app_booking.models import DatPhong, ThanhToan
from apps.app_booking.choices import TrangThaiDatPhong, TrangThaiThanhToan

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

    def update(self, instance: DatPhong, refund_state):
        payment_record: ThanhToan = instance.invoice.payments
        
        match refund_state:
            case "Processing":
                instance.status = TrangThaiDatPhong.CANCELLED
                payment_record.status = TrangThaiThanhToan.REFUND_PROCESSING
            case "Success":
                instance.status = TrangThaiDatPhong.CANCELLED
                payment_record.status = TrangThaiThanhToan.REFUNDED
            case "Failed":
                instance.status = TrangThaiDatPhong.CANCELLED_FAILED
                payment_record.status = TrangThaiThanhToan.REFUND_FAILED
            case _:
                return instance
            
        payment_record.save(update_fields=["status"])

        instance.updated_at = timezone.now()
        instance.save(update_fields=["status", "updated_at"])
        
        return instance
