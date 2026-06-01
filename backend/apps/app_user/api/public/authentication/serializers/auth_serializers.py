from rest_framework import serializers, status
from rest_framework.serializers import ModelSerializer, Serializer, ValidationError
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import AuthenticationFailed, APIException

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate

from uuid import UUID

from apps.app_user.choices import RoleChoice
from apps.app_user.models import NguoiDung, ThongTinNguoiDung, VaiTroNguoiDung, VaiTro


class LoginSerializer(Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, style={"input_style": "password"})
    login_as = serializers.ChoiceField(RoleChoice, write_only=True)

    def validate(self, attrs: dict):
        """Calling is_valid() would validate the data and authenticate the user."""

        attrs["user"] = self.validate_user(credentials=attrs)
        attrs["role"] = self.validate_user_role(attrs["user"], attrs["login_as"])

        attrs.pop("password")

        return attrs

    def validate_user(self, credentials) -> NguoiDung:
        """Attempt to authenticate using the given credentials and return User Object."""

        user = authenticate(
            email=credentials["email"], password=credentials["password"]
        )

        if user is None:
            raise AuthenticationFailed("Invalid credentials.")

        return user

    def validate_user_role(self, user: NguoiDung, login_as) -> VaiTroNguoiDung:
        try:
            role: VaiTroNguoiDung = user.role_set.select_related("id_role").get(
                id_role__role_name=login_as
            )
        except Exception as e:
            raise ValidationError(
                detail={"error": "User doesn't have access to this role."}
            )

        return role

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


class FetchAuthUserSerializer(Serializer):
    id_auth_user = serializers.UUIDField()
    role = serializers.ChoiceField(
        choices=RoleChoice,
    )

    def validate(self, attrs):
        user: NguoiDung = self.validate_auth_user(attrs["id_auth_user"])
        auth_user_role: VaiTroNguoiDung = self.validate_auth_user_role(
            user, attrs["role"]
        )

        attrs["auth_user_role"] = auth_user_role

        return attrs

    def validate_auth_user(self, id_auth_user: UUID):
        try:
            user = NguoiDung.objects.get(id_user=id_auth_user)
        except Exception as e:
            raise AuthenticationFailed(
                {"error": "The user is either inactive or no longer existed."}
            )
        return user

    def validate_auth_user_role(self, user: NguoiDung, role: str):
        try:
            auth_user_role: VaiTroNguoiDung = user.role_set.select_related(
                "id_role"
            ).get(id_role__role_name=role)
        except Exception as e:
            raise AuthenticationFailed(
                {"error": "The user's role is either removed or no longer existed."}
            )

        return auth_user_role


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
    role = serializers.SerializerMethodField()

    class Meta:
        model = NguoiDung
        fields = ["email", "personal_info", "role"]
        read_only_fields = ["email", "personal_info", "role"]

    def get_role(self, user: NguoiDung):
        role: VaiTroNguoiDung = self.context.get("role")

        if not role:
            raise APIException(detail={"error": "Missing role context."})

        return role.id_role.role_name
