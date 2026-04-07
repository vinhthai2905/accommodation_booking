from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.views import Request, Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

from  apps.app_nguoidung.api.serializers import UserSerializer

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
        
        return Response({
            "user": user_serializer.data,
            "access_token": str(refresh.access_token),
            "refresh": str(refresh)
        },
        status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request: Request):
        return Response({
            "message": "Authenticated",
            "user": str(request.user)
        })