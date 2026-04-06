from apps.app_nguoidung.models import NguoiDung, ThongTinNguoiDung

from rest_framework.serializers import ModelSerializer
from rest_framework.exceptions import ValidationError, status
from rest_framework import serializers

class UserSerializer(ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = NguoiDung
        fields = ["first_name", "last_name", "email", "phone_number", "password", "confirm_password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """Create and save the user to database."""
        
        validated_data.pop("confirm_password", None)
        
        user = NguoiDung.objects.create_user(**validated_data)
        user.save()

        return user
    
    def password_validation(self):
        if self.validated_data["password"] != self.validated_data["confirm_password"]:
            raise ValidationError("The password confirmation does not match!")
    
    def peform_validation(self):
        """Check to see whether the confirmation password is correct and validate data."""
        
        self.is_valid(raise_exception=True)
        self.password_validation()
        


