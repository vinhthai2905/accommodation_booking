from rest_framework import serializers

from apps.common.helpers import get_booking
from apps.app_hotel.model.danh_gia_models import DanhGiaKhachSan

class UserCreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = DanhGiaKhachSan
        fields = ["id_booking", "content", "rating"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["id_user"] = user
        return super().create(validated_data)

    def validate(self, attrs):
        user = self.context["request"].user
        booking = attrs.get("id_booking")
        
        if booking.id_user != user:
            raise serializers.ValidationError({"detail": "Bạn không có quyền đánh giá đặt phòng này."})
            
        if booking.status not in ["CONFIRMED", "COMPLETED"]:
            raise serializers.ValidationError({"detail": "Bạn chỉ có thể đánh giá những đặt phòng đã nhận phòng hoặc đã trả phòng."})
            
        if DanhGiaKhachSan.objects.filter(id_booking=booking, id_user=user).exists():
            raise serializers.ValidationError({"detail": "Bạn đã đánh giá đặt phòng này rồi."})
            
        return attrs
    
    def _validate_booking_owner(booking, user):
        pass
        
    def _validate_hotel(id_hotel):
        pass