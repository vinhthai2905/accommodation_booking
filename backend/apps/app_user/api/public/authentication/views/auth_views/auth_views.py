from rest_framework.views import APIView
from rest_framework.views import Request, Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from apps.app_user.helpers import create_auth_tokens
from apps.app_user.models import NguoiDung, VaiTroNguoiDung

from apps.app_user.api.public.authentication.serializers import (
    LoginSerializer,
    LogoutSerializer,
    AuthenticatedUserSerializer,
    FetchAuthUserSerializer,
)


class AuthLoginView(APIView):
    http_method_names = ["post"]
    permission_classes = [AllowAny]

    serializer_class = LoginSerializer

    def post(self, request: Request, *args, **kwargs):
        login_serializer: LoginSerializer = self.serializer_class(data=request.data)
        login_serializer.is_valid(raise_exception=True)

        user: NguoiDung = login_serializer.validated_data["user"]
        role: VaiTroNguoiDung = login_serializer.validated_data["role"]
        refresh = create_auth_tokens(user, role)

        response = Response(
            data={
                "user": AuthenticatedUserSerializer(
                    instance=user, context={"role": role}
                ).data,
                "access_token": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite="lax",
            path="/",
        )

        return response


class AuthLogoutView(APIView):
    http_method_names = ["post"]

    serializer_class = LogoutSerializer

    def post(self, request: Request, *args, **kwargs):
        logout_serializer = self.serializer_class(
            data={"refresh": request.COOKIES.get("refresh_token")}
        )

        logout_serializer.is_valid(raise_exception=True)
        logout_serializer.perform_blacklist()

        response = Response(
            data={"message": "Token successfully deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )

        response.delete_cookie("refresh_token")

        return response


class FetchAuthUserView(APIView):
    http_method_names = ["post"]
    permission_classes = [IsAuthenticated]
    serializer_class = FetchAuthUserSerializer

    def post(self, request: Request, *args, **kwargs):
        fetch_user_serializer = FetchAuthUserSerializer(
            data={
                "id_auth_user": request.user.id_user,
                "role": request.auth.get("active_role"),
            }
        )
        fetch_user_serializer.is_valid(raise_exception=True)
        
        user_data = AuthenticatedUserSerializer(
            instance=request.user,
            context={
                "role": fetch_user_serializer.validated_data["auth_user_role"]
            },
        ).data

        return Response(
            data={"user": user_data},
            status=status.HTTP_200_OK,
        )
