from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from apps.app_hotel.api.permissions import IsAuthenticatedPartner
from apps.common.permission import IsAuthenticatedUserActive

from apps.app_hotel.models import KhachSan

from apps.app_hotel.api.private.partner_hotel_detail.serializers import ChildrenPolicySerializer

class PartnerChildrenPolicyView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]
    serializer_class = ChildrenPolicySerializer

    def _get_partner_hotel(self, user):
        return get_object_or_404(KhachSan, id_user=user)

    def get(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        try:
            policy = hotel.child_policy
        except ObjectDoesNotExist:
            return Response(None, status=status.HTTP_200_OK)
            
        serializer = self.serializer_class(policy)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        try:
            policy = hotel.child_policy
            serializer = self.serializer_class(policy, data=request.data, partial=True)
        except ObjectDoesNotExist:
            serializer = self.serializer_class(data=request.data)
            
        if serializer.is_valid():
            serializer.save(id_hotel=hotel)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
