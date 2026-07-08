from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.app_ai.services.bumblebee_recommendation_service import (
    BumblebeeRecommendationService,
)
from apps.app_ai.api.public.bumblebee_chatbox.serializers import (
    BumblebeeRecommendInputSerializer,
    BumblebeeRecommendResultSerializer,
)
class BumblebeeHotelRecommendView(APIView):
    def _validate_guest_input(self, input):
        input_serializer = BumblebeeRecommendInputSerializer(
            data=input
        )
        input_serializer.is_valid(raise_exception=True)
        limited_hotels = input_serializer.validated_data.get("limit", 10)
        desired_amenities = input_serializer.validated_data.get("desired_amenities", [])
        return limited_hotels, desired_amenities
    def get(self, request, *args, **kwargs):
        limited_hotels, desired_amenities = self._validate_guest_input(request.query_params)
        recommendations = BumblebeeRecommendationService.get_hotel_recommendations(
            limit=limited_hotels,
            desired_amenities=desired_amenities,
        )
        output_serializer = BumblebeeRecommendResultSerializer(
            recommendations,
            many=True,
        )
        return Response(
            output_serializer.data,
            status=status.HTTP_200_OK,
        )