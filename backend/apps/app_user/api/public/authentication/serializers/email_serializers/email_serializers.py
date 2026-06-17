from rest_framework import serializers
from apps.app_user.models import NguoiDung

class SendVerificationEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = NguoiDung
        fields = ["verification_expires_at"]
        read_only_fields = ["verification_expires_at"]
        
        
    def update(self, instance: NguoiDung, validated_data):
        pass
    

class VerifyUserEmailSerializer(serializers.Serializer):
    pass