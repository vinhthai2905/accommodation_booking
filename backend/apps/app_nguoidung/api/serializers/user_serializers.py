from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer, ValidationError
from rest_framework.exceptions import AuthenticationFailed

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate

from apps.app_nguoidung.models import NguoiDung, ThongTinNguoiDung

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
    
    def check_password_confirmation(self):
        if self.validated_data["password"] != self.validated_data["confirm_password"]:
            raise ValidationError("The password confirmation does not match!")
    
    def peform_validation(self):
        """Check to see whether the confirmation password is correct and validate data with is_valid()."""
        
        self.is_valid(raise_exception=True)
        self.check_password_confirmation()
        
class LoginSerializer(Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        style = {
            "input_style": "password"
        }
    )
    
    def validate(self, attrs: dict):
        """Calling is_valid() would validate the data and authenticate the user."""
        
        attrs["user"] = self.validate_user(credentials=attrs)
        attrs.pop("password")
        
        return attrs
    
    def validate_user(self, credentials):
        """Attempt to authenticate using the given credentials."""
        
        user = authenticate(
            email=credentials["email"],
            password=credentials["password"]
        )
        
        if user is None:
            raise AuthenticationFailed("Invalid credentials.")
        
        return user
    
    def validate_email(self, email):
        """Lowercase the email."""
        
        return NguoiDung.objects.normalize_email(email=email).lower()     
        
class LogoutSerializer(Serializer):
    refresh = serializers.CharField(write_only=True)
    
    def validate_refresh(self, refresh):
        try:
            refresh_token = RefreshToken(token=refresh, verify=True)
        except TokenError:
            raise ValidationError("Invalid or expired token.")
        
        return refresh_token
        
    def perform_blacklist(self):
        """Attempt to delete the token after being validated."""
        
        RefreshToken.blacklist(self.validated_data["refresh"])
    
        


