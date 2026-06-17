from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions

from uuid import UUID

from apps.common.helpers import get_hotel
from apps.app_hotel.models import KhachSan, ChinhSachTreEm, ChinhSachHoanTien
from apps.app_hotel.api.public.hotel_preview.serializers import (
    HotelBookingPreviewSerializer, ChildPolicyPreviewSerializer, RefundPolicyPreviewSerializer
)

class HotelBookingPreviewView(APIView):
    """View to retrieve hotel data and its child policy for booking processes."""

    serializer_class = HotelBookingPreviewSerializer
    hotel_model = KhachSan

    def get(self, request: Request, id_hotel: UUID):
        try:
            hotel = (
                self.hotel_model.objects
                .select_related("child_policy", "refund_policy")
                .prefetch_related("hotel_images")
                .get(id_hotel=id_hotel)
            )
        except self.hotel_model.DoesNotExist:
            raise exceptions.NotFound("Hotel not found.")

        serializer = self.serializer_class(instance=hotel)
        return Response(serializer.data)

class ChildPolicyPreviewView(APIView):
    serializer_class = ChildPolicyPreviewSerializer
    hotel_model = KhachSan
    child_policy_model = ChinhSachTreEm

    def get(self, request: Request, id_hotel: UUID):
        hotel = get_hotel(id_hotel)

        try:
            child_policy = self.child_policy_model.objects.get(id_hotel=hotel)
        except self.child_policy_model.DoesNotExist:
            raise exceptions.NotFound("Child policy not found for this hotel.")

        serializer = self.serializer_class(instance=child_policy)

        return Response(serializer.data)

class RefundPolicyPreviewView(APIView):
    serializer_class = RefundPolicyPreviewSerializer
    hotel_model = KhachSan
    refund_policy_model = ChinhSachHoanTien

    def get(self, request: Request, id_hotel: UUID):
        hotel = get_hotel(id_hotel)

        try:
            refund_policy = self.refund_policy_model.objects.get(id_hotel=hotel)
        except self.refund_policy_model.DoesNotExist:
            raise exceptions.NotFound("Refund policy not found for this hotel.")

        serializer = self.serializer_class(instance=refund_policy)

        return Response(serializer.data)