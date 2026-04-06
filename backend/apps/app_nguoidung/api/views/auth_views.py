from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.views import Request, Response
from rest_framework.renderers import JSONRenderer

import rest_framework.status as status

from  apps.app_nguoidung.api.serializers import UserSerializer

class UserRegisterView(APIView):
    http_method_names = ["post"]
    
    # renderer_classes = [JSONRenderer]
    serializer_class = UserSerializer
    
    def post(self, request: Request, *args, **kwargs):
        user_serializer: UserSerializer = self.serializer_class(data=request.data)
        
        user_serializer.peform_validation()
        print(user_serializer.validated_data)
        user_serializer.create(validated_data=user_serializer.validated_data)
        
        return Response(data=user_serializer.data, status=status.HTTP_201_CREATED)