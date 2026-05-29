from rest_framework import serializers
from apps.app_hotel.models import DonDangKyKhachSan, TaiLieuDangKy, LoaiKhachSan

class LoaiKhachSanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoaiKhachSan
        fields = ["id", "name", "slug"]

class DonDangKyKhachSanSerializer(serializers.ModelSerializer):
    document_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    document_url = serializers.CharField(write_only=True, required=False, allow_blank=True)
    document_file = serializers.FileField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = DonDangKyKhachSan
        fields = [
            "id_registration",
            "hotel_name",
            "address",
            "phone_number",
            "latitude",
            "longitude",
            "id_hotel_type",
            "id_ward",
            "document_name",
            "document_url",
            "document_file",
            "status",
            "reject_reason",
            "created_at",
            "updated_at",
            "approved_at",
        ]
        read_only_fields = [
            "id_registration",
            "status",
            "reject_reason",
            "created_at",
            "updated_at",
            "approved_at",
        ]

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        try:
            if hasattr(instance, 'document') and instance.document:
                ret['document_name'] = instance.document.document_name
                ret['document_url'] = instance.document.url
        except Exception:
            pass
        return ret

    def create(self, validated_data):
        document_name = validated_data.pop("document_name", None)
        document_url = validated_data.pop("document_url", None)
        document_file = validated_data.pop("document_file", None)
        user = self.context["request"].user

        registration = DonDangKyKhachSan.objects.create(
            id_user=user,
            **validated_data
        )

        final_url = document_url
        if document_file:
            from django.core.files.storage import FileSystemStorage
            from django.conf import settings
            import os
            import uuid
            
            doc_dir = os.path.join(settings.MEDIA_ROOT, 'registration_documents')
            os.makedirs(doc_dir, exist_ok=True)
            
            fs = FileSystemStorage(location=doc_dir)
            ext = document_file.name.split('.')[-1]
            unique_filename = f"{uuid.uuid4().hex}.{ext}"
            filename = fs.save(unique_filename, document_file)
            final_url = f"{settings.MEDIA_URL}registration_documents/{filename}"

        if document_name and final_url:
            TaiLieuDangKy.objects.create(
                id_registration=registration,
                document_name=document_name,
                url=final_url
            )

        return registration
