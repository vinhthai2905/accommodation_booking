from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

from apps.app_user.api.public.users.serializers import UserPartialUpdateSerializer, UserSerializer
from apps.common.permission import IsAuthenticatedUserActive, IsCustomer

class UserProfileView(APIView):
    """
    Endpoint for the currently authenticated user to retrieve and patch their profile.
    """
    permission_classes = [IsCustomer, IsAuthenticatedUserActive]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def patch(self, request, *args, **kwargs):
        serializer = UserPartialUpdateSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    


        
