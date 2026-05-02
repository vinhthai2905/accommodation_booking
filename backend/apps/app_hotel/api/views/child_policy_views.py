from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions

from uuid import UUID

from apps.app_hotel.models import KhachSan, ChinhSachTreEm
from apps.app_hotel.api.serializers import ChildPolicySummarySerializer

class ChildPolicyView(APIView):
    serializer_class = ChildPolicySummarySerializer
    hotel_model = KhachSan
    child_policy_model = ChinhSachTreEm

    def get(self, request: Request, id_hotel: UUID):
        try:
            hotel = self.hotel_model.objects.get(id_hotel=id_hotel)
        except self.hotel_model.DoesNotExist:
            raise exceptions.NotFound("Hotel not found.")

        try:
            child_policy = self.child_policy_model.objects.get(id_hotel=hotel)
        except self.child_policy_model.DoesNotExist:
            raise exceptions.NotFound("Child policy not found for this hotel.")

        serializer = self.serializer_class(instance=child_policy)

        return Response(serializer.data)
