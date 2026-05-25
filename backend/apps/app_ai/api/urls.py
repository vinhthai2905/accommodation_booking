from django.urls import path
from apps.app_ai.api.public.bumblebee_chatbox.views import BumblebeeHotelRecommendView, BumblebeeChatView

urlpatterns = [
    path("api/ai/recommendations", BumblebeeHotelRecommendView.as_view(), name="hotel-ai-recommendations"),
    path("api/ai/chat", BumblebeeChatView.as_view(), name="hotel-ai-chat"),
]
