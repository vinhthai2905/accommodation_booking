from rest_framework import serializers
from apps.app_hotel.model.danh_gia_models import DanhGiaKhachSan

class HotelReviewListSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.SerializerMethodField()
    reviewer_country = serializers.SerializerMethodField()

    class Meta:
        model = DanhGiaKhachSan
        fields = [
            'id_rating', 
            'rating', 
            'content', 
            'created_at', 
            'reviewer_name', 
            'reviewer_country'
        ]

    def get_reviewer_name(self, obj: DanhGiaKhachSan):
        if hasattr(obj.id_user, 'personal_info'):
            personal_info = obj.id_user.personal_info
            if personal_info.display_name:
                return personal_info.display_name
            if personal_info.first_name or personal_info.last_name:
                return f"{personal_info.first_name or ''} {personal_info.last_name or ''}".strip()
            
        return obj.id_user.email.split('@')[0]

    def get_reviewer_country(self, obj: DanhGiaKhachSan):
        if hasattr(obj.id_user, 'personal_info') and obj.id_user.personal_info.country:
            return obj.id_user.personal_info.country
        return "Việt Nam"
