from django.shortcuts import get_object_or_404

from rest_framework import serializers, exceptions, status
from rest_framework.validators import UniqueValidator, ValidationError

from apps.app_user.models import NguoiDung, ThongTinNguoiDung, VaiTro
from apps.app_user.choices import RoleChoice


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=NguoiDung.objects.all(), message="Email này đã được sử dụng."
            )
        ]
    )
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone_number = serializers.CharField(
        write_only=True, 
        validators=[
        UniqueValidator(
            queryset=ThongTinNguoiDung.objects.all(), message="Số điện thoại này đã được sử dụng"
        )
    ])
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = NguoiDung
        fields = [
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "password",
            "confirm_password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """Create and save the user to database."""

        try:
            validated_data.pop("confirm_password", None)

            user = NguoiDung.objects.create_user(**validated_data, role_name="Khách hàng")
            self.role_assignment = (
                user.role_set.select_related("id_role").get(id_role__role_name="Khách hàng")
            )
        except Exception as e:
            raise exceptions.APIException(
                detail={"Error": "The role wasn't assigned for the user during the progression."},
                code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return user

    def check_password_confirmation(self):
        if self.validated_data["password"] != self.validated_data["confirm_password"]:
            raise ValidationError("The password confirmation does not match!")

    def peform_validation(self):
        """Check to see whether the confirmation password is correct and validate data with is_valid()."""

        self.is_valid(raise_exception=True)
        self.check_password_confirmation()
