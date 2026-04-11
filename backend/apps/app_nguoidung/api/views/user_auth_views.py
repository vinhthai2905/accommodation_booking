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


from apps.app_nguoidung.api.serializers import UserSerializer, LoginSerializer, LogoutSerializer


class UserRegisterView(APIView):
    http_method_names = ["post"]
    permission_classes = [AllowAny]

    # renderer_classes = [JSONRenderer]
    serializer_class = UserSerializer

    def post(self, request: Request, *args, **kwargs):
        user_serializer: UserSerializer = self.serializer_class(data=request.data)

        user_serializer.peform_validation()
        user = user_serializer.create(validated_data=user_serializer.validated_data)

        refresh = RefreshToken.for_user(user=user)
        
        return Response(
            data={
                "name": user_serializer.data["first_name"] + " " + user_serializer.data["last_name"],
                "email" : user_serializer.data["email"],
                "access_token": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    http_method_names = ["post"]
    permission_classes = [AllowAny]

    serializer_class = LoginSerializer

    def post(self, request: Request, *args, **kwargs):
        login_serializer: LoginSerializer = self.serializer_class(data=request.data)

        login_serializer.is_valid(raise_exception=True)

        refresh = RefreshToken.for_user(login_serializer.validated_data["user"])

        return Response(
            data={
                "user": login_serializer.data,
                "access_token": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK
        )


class LogoutView(APIView):
    http_method_names = ["post"]
    
    serializer_class = LogoutSerializer
    
    def post(self, request: Request, *args, **kwargs):
        logout_serializer = self.serializer_class(data=request.data)
        
        logout_serializer.is_valid(raise_exception=True)
        logout_serializer.perform_blacklist()
        
        return Response(
            data={"message": "Token successfully deleted."},
            status=status.HTTP_204_NO_CONTENT
        )