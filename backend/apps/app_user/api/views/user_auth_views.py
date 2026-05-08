from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from apps.app_user.api.serializers import UserRegisterSerializer, AuthenticatedUserSerializer


class UserRegisterView(APIView):
    http_method_names = ["post"]
    permission_classes = [AllowAny]

    # renderer_classes = [JSONRenderer]
    serializer_class = UserRegisterSerializer

    def post(self, request: Request, *args, **kwargs):
        user_serializer: UserRegisterSerializer = self.serializer_class(data=request.data)
        user_serializer.peform_validation()

        user = user_serializer.create(validated_data=user_serializer.validated_data)
        refresh = RefreshToken.for_user(user=user)

        response = Response(
            data={
                "user": AuthenticatedUserSerializer(instance=user).data,
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