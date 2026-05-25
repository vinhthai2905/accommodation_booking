from rest_framework import serializers
from apps.app_hotel.models import DonDangKyKhachSan

class AdminDonDangKyKhachSanSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='id_user.email', read_only=True)
    document_name = serializers.SerializerMethodField()
    document_url = serializers.SerializerMethodField()
    hotel_type_name = serializers.CharField(source='id_hotel_type.name', read_only=True)
    ward_name = serializers.CharField(source='id_ward.ward_name', read_only=True)

    class Meta:
        model = DonDangKyKhachSan
        fields = [
            "id_registration",
            "user_email",
            "hotel_name",
            "address",
            "phone_number",
            "latitude",
            "longitude",
            "id_hotel_type",
            "hotel_type_name",
            "id_ward",
            "ward_name",
            "document_name",
            "document_url",
            "status",
            "reject_reason",
            "created_at",
            "updated_at",
            "approved_at",
        ]
        read_only_fields = [
            "id_registration",
            "created_at",
            "updated_at",
            "approved_at",
        ]

    def get_document_name(self, obj):
        try:
            return obj.document.document_name if hasattr(obj, 'document') and obj.document else None
        except Exception:
            return None

    def get_document_url(self, obj):
        try:
            return obj.document.url if hasattr(obj, 'document') and obj.document else None
        except Exception:
            return None
