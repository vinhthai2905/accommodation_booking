from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions

from uuid import UUID

from apps.app_hotel.models import KhachSan
from apps.app_hotel.api.serializers.hotel_booking_serializers import (
    HotelBookingSummarySerializer,
)

class HotelBookingSummaryView(APIView):
    """View to retrieve hotel data and its child policy for booking processes."""

    serializer_class = HotelBookingSummarySerializer
    hotel_model = KhachSan

    def get(self, request: Request, id_hotel: UUID):
        try:
            hotel = (
                self.hotel_model.objects
                .select_related("child_policy")
                .prefetch_related("hotel_images")
                .get(id_hotel=id_hotel)
            )
        except self.hotel_model.DoesNotExist:
            raise exceptions.NotFound("Hotel not found.")

        serializer = self.serializer_class(instance=hotel)
        return Response(serializer.data)
