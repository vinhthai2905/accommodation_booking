from rest_framework import serializers
from apps.app_hotel.model.danh_gia_models import DanhGiaKhachSan

class HotelReviewListSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.SerializerMethodField()
    reviewer_country = serializers.SerializerMethodField()
    room_type = serializers.SerializerMethodField()
    stay_duration = serializers.SerializerMethodField()
    group_type = serializers.SerializerMethodField()

    class Meta:
        model = DanhGiaKhachSan
        fields = [
            'id_rating', 
            'rating', 
            'content', 
            'created_at', 
            'reviewer_name', 
            'reviewer_country',
            'room_type',
            'stay_duration',
            'group_type'
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

    def get_room_type(self, obj: DanhGiaKhachSan):
        booking = obj.id_booking
        details = booking.booking_details.all()
        if details.exists():
            return details.first().id_room.room_name
        return "Phòng"

    def get_stay_duration(self, obj: DanhGiaKhachSan):
        booking = obj.id_booking
        if booking.check_out_date and booking.check_in_date:
            nights = (booking.check_out_date - booking.check_in_date).days
            month = booking.check_in_date.month
            year = booking.check_in_date.year
            return f"{nights} đêm · Tháng {month} {year}"
        return ""

    def get_group_type(self, obj: DanhGiaKhachSan):
        booking = obj.id_booking
        adults = booking.total_adults or 0
        children = booking.total_children or 0
        if adults == 1 and children == 0:
            return "Khách lẻ"
        elif adults == 2 and children == 0:
            return "Cặp đôi"
        elif adults >= 1 and children > 0:
            return "Gia đình"
        elif adults > 2:
            return "Nhóm"
        return "Khác"
