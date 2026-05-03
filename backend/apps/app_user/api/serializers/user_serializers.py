from django.shortcuts import get_object_or_404
from rest_framework import serializers

from apps.app_user.models import NguoiDung, ThongTinNguoiDung

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThongTinNguoiDung
        fields = [
            "first_name", 
            "last_name", 
            "phone_number", 
        ]

class AuthenticatedUserSerializer(serializers.ModelSerializer):
    personal_info = PersonalInfoSerializer()

    class Meta:
        model = NguoiDung
        fields = [
            "email",
            "personal_info",
        ]
        read_only_fields = [
            "email",
            "personal_info",
        ]