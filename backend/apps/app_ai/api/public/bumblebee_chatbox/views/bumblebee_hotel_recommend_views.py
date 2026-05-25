from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.app_ai.services.recommendation_service import RecommendationService
from apps.app_ai.api.public.bumblebee_chatbox.serializers import BumblebeeRecommendInputSerializer, BumbebeeRecommendResultSerializer

class BumblebeeHotelRecommendView(APIView):
    def get(self, request, *args, **kwargs):
        input_serializer = BumblebeeRecommendInputSerializer(data=request.query_params)
        input_serializer.is_valid(raise_exception=True)
        
        validated_data = input_serializer.validated_data
        
        w_price = validated_data.get("w_price", 1.0)
        w_beach = validated_data.get("w_beach", 1.0)
        w_amenity = validated_data.get("w_amenity", 1.0)
        limit = validated_data.get("limit", 10)
        
        recommendations = RecommendationService.get_recommendations(
            w_price=w_price,
            w_beach=w_beach,
            w_amenity=w_amenity,
            limit=limit
        )
        
        output_serializer = BumbebeeRecommendResultSerializer(recommendations, many=True)
        return Response(output_serializer.data, status=status.HTTP_200_OK)