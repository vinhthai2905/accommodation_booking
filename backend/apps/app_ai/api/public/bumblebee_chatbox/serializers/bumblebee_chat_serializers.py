from rest_framework import serializers
from apps.app_ai.api.public.bumblebee_chatbox.serializers.bumblebee_hotel_recommend_serializers import (
    BumblebeeRecommendResultSerializer,
)
class BumblebeeChatInputSerializer(serializers.Serializer):
    message = serializers.CharField(
        max_length=500,
        help_text="The guest's natural-language message to Bumblebee.",
    )
class BumblebeeChatResponseSerializer(serializers.Serializer):
    response = serializers.CharField(
        help_text="Bumblebee's natural-language reply to the guest.",
    )
    hotels = BumblebeeRecommendResultSerializer(
        many=True,
        help_text="Top hotel recommendations ranked by AI score.",
    )