from rest_framework import serializers
from rest_framework.validators import UniqueValidator, ValidationError

from apps.app_user.models import NguoiDung


class PartnerRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=NguoiDung.objects.all(), message="Email này đã được sử dụng."
            )
        ]
    )
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone_number = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = NguoiDung
        fields = [
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "password",
            "confirm_password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """Create and save the user to database."""

        validated_data.pop("confirm_password", None)
        validated_data["role_name"] = "Đối tác"

        user = NguoiDung.objects.create_user(**validated_data)

        return user
    
    def check_password_confirmation(self):
        if self.validated_data["password"] != self.validated_data["confirm_password"]:
            raise ValidationError("The password confirmation does not match!")

    def peform_validation(self):
        """Check to see whether the confirmation password is correct and validate data with is_valid()."""

        self.is_valid(raise_exception=True)
        self.check_password_confirmation()
