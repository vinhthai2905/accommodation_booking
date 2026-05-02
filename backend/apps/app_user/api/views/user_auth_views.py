from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.views import Request, Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework import status
from rest_framework.exceptions import APIException, ValidationError

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

from helpers import get_user_name, get_email

from apps.app_user.api.serializers import (
    RegisterSerializer,
    LoginSerializer,
    LogoutSerializer,
    AuthenticatedUserSerializer
)

from apps.app_user.models import NguoiDung

class UserRegisterView(APIView):
    http_method_names = ["post"]
    permission_classes = [AllowAny]

    # renderer_classes = [JSONRenderer]
    serializer_class = RegisterSerializer

    def post(self, request: Request, *args, **kwargs):
        user_serializer: RegisterSerializer = self.serializer_class(data=request.data)
        user_serializer.peform_validation()
        
        user = user_serializer.create(validated_data=user_serializer.validated_data)
        refresh = RefreshToken.for_user(user=user)

        response = Response(
            data={
                "name": get_user_name(user),
                "email": user_serializer.data["email"],
                "access_token": str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
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

class LoginView(APIView):
    http_method_names = ["post"]
    permission_classes = [AllowAny]

    serializer_class = LoginSerializer

    def post(self, request: Request, *args, **kwargs):
        login_serializer: LoginSerializer = self.serializer_class(data=request.data)
        login_serializer.is_valid(raise_exception=True)

        user = login_serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)

        response = Response(
            data={
                "user": AuthenticatedUserSerializer(instance=user).data,
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

class LogoutView(APIView):
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

class FetchUserView(APIView):
    http_method_names = ["post"]

    permission_classes = [IsAuthenticated]

    def post(self, request: Request, *args, **kwargs):
        return Response(
            data={"name": get_user_name(request.user), "email": request.user.email},
            status=status.HTTP_200_OK,
        )
