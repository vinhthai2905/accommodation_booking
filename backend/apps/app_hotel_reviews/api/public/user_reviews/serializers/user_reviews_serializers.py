from rest_framework import serializers

from django.shortcuts import get_object_or_404

from apps.common.helpers import get_booking

from apps.app_hotel.models import DanhGiaKhachSan, DatPhong
from apps.app_user.models import NguoiDung


class UserCreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = DanhGiaKhachSan
        fields = ["id_booking", "id_user", "content", "rating"]

    def create_review(self, validated_data):
        return self._peform_review_creation(validated_data)
        
    
    def validate(self, attrs):
        user = attrs.get("id_user")
        booking = attrs.get("id_booking")
        
        self._validate_booking_owner(booking, user)
        self._validate_booking_status(booking, user)    
        self._validate_is_reviewed(booking, user)    
            
        return attrs
    
    def _validate_booking_owner(self, booking: DatPhong, user: NguoiDung):
        if booking.id_user != user:
            raise serializers.ValidationError({"detail": "Bạn không có quyền đánh giá đặt phòng này."})
        
    def _validate_booking_status(self, booking: DatPhong, user: NguoiDung):
        if booking.status not in ["CONFIRMED", "COMPLETED"]:
            raise serializers.ValidationError({"detail": "Bạn chỉ có thể đánh giá những đặt phòng đã nhận phòng hoặc đã trả phòng."})
        
    def _validate_is_reviewed(self, booking: DatPhong, user: NguoiDung):
        if DanhGiaKhachSan.objects.filter(id_booking=booking, id_user=user).exists():
            raise serializers.ValidationError({"detail": "Bạn đã đánh giá đặt phòng này rồi."})
        
    def _peform_review_creation(self, validated_data):
        return DanhGiaKhachSan.objects.create(
            id_booking = validated_data["id_booking"],
            id_user = validated_data["id_user"],
            content=validated_data["content"],
            rating=validated_data["rating"]
        ).save()
        
        
    
    # def validate_id_user(self, id_user):
    #     return get_object_or_404(NguoiDung, id_user)
        