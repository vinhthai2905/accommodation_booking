from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken


from apps.app_user.helpers import create_auth_tokens
from apps.app_user.api.public.authentication.serializers import (
    UserRegisterSerializer,
    AuthenticatedUserSerializer,
)


class UserRegisterView(APIView):
    http_method_names = ["post"]
    permission_classes = [AllowAny]

    # renderer_classes = [JSONRenderer]
    serializer_class = UserRegisterSerializer

    def post(self, request: Request, *args, **kwargs):
        user_register_serializer: UserRegisterSerializer = self.serializer_class(
            data=request.data
        )
        user_register_serializer.peform_validation()


        user = user_register_serializer.create(
            validated_data=user_register_serializer.validated_data
        )
        refresh = create_auth_tokens(user, user_register_serializer.role_assignment)

        response = Response(
            data={
                "user": AuthenticatedUserSerializer(
                    instance=user,
                    context={"role": user_register_serializer.role_assignment},
                ).data,
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
