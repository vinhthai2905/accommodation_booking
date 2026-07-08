from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.app_ai.services.bumblebee_recommendation_service import (
    BumblebeeRecommendationService
)
from apps.app_ai.api.public.bumblebee_chatbox.serializers import (
    BumblebeeRecommendResultSerializer,
)
from apps.app_ai.api.public.bumblebee_chatbox.serializers.bumblebee_chat_serializers import (
    BumblebeeChatInputSerializer,
)
from apps.app_ai.helpers.amenity_helpers import parse_guest_preferences
class BumblebeeChatView(APIView):
    def _detect_user_intents(self, user_message: str, prefer_no_beach: bool, desired_amenities: list[str]):
        import re
        has_price_intent = any(
            re.search(rf"\b{keyword}\b", user_message)
            for keyword in ["rẻ", "giá", "tiền", "cheap", "cost", "tiết kiệm"]
        )
        has_beach_intent = any(
            re.search(rf"\b{keyword}\b", user_message)
            for keyword in ["biển", "beach", "cát", "sóng", "đại dương"]
        ) and not prefer_no_beach
        
        has_amenity_intent = len(desired_amenities) > 0
        return has_price_intent, has_beach_intent, has_amenity_intent
    def _generate_chatbot_response(self, prefer_no_beach: bool, has_price_intent: bool, has_beach_intent: bool, has_amenity_intent: bool) -> str:
        if prefer_no_beach and has_price_intent:
            return "Ưu tiên tiêu chí giá phòng tiết kiệm và vị trí trung tâm (không gần biển), đây là các gợi ý phù hợp nhất cho bạn:"
        elif prefer_no_beach and has_amenity_intent:
            return "Dành cho nhu cầu ở xa biển nhưng vẫn đầy đủ tiện nghi dịch vụ, mình xin gợi ý các khách sạn sau:"
        elif prefer_no_beach:
            return "Theo yêu cầu của bạn, đây là danh sách các khách sạn khu vực trung tâm/nội thành và không nằm sát biển:"
        elif has_price_intent and has_beach_intent and has_amenity_intent:
            return "Mình đã tìm được các khách sạn tại Đà Nẵng đáp ứng tối đa cả ba tiêu chí: giá tốt, gần biển và đầy đủ tiện nghi công cộng cho bạn."
        elif has_price_intent and has_beach_intent:
            return "Ưu tiên tiêu chí giá phòng tiết kiệm và vị trí gần bãi biển nhất, đây là các gợi ý phù hợp nhất cho bạn:"
        elif has_price_intent and has_amenity_intent:
            return "Dành cho nhu cầu phòng giá rẻ nhưng vẫn đầy đủ tiện nghi dịch vụ, mình xin gợi ý các khách sạn sau:"
        elif has_beach_intent and has_amenity_intent:
            return "Nếu bạn muốn ở sát biển và tận hưởng nhiều tiện ích cao cấp, đây là những lựa chọn hàng đầu:"
        elif has_price_intent:
            return "Mình đã chọn lọc ra những khách sạn có mức giá phòng tối ưu và tiết kiệm nhất tại Đà Nẵng dành cho bạn:"
        elif has_beach_intent:
            return "Để thuận tiện di chuyển ra bãi tắm, đây là danh sách các khách sạn có khoảng cách gần biển nhất:"
        elif has_amenity_intent:
            return "Dưới đây là danh sách các khách sạn sở hữu nhiều tiện nghi công cộng phong phú nhất:"
        else:
            return "Dựa trên các thông số về giá cả, vị trí và tiện nghi dịch vụ, mình xin gợi ý danh sách khách sạn tốt nhất sau:"
    def post(self, request, *args, **kwargs):
        input_serializer = BumblebeeChatInputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        user_message = input_serializer.validated_data["message"].lower()
        preferences  = parse_guest_preferences(user_message)
        prefer_cheap      = preferences["prefer_cheap"]
        prefer_no_beach   = preferences["prefer_no_beach"]
        desired_amenities = preferences["desired_amenities"]
        has_price_intent, has_beach_intent, has_amenity_intent = self._detect_user_intents(
            user_message, prefer_no_beach, desired_amenities
        )
        response_text = self._generate_chatbot_response(
            prefer_no_beach, has_price_intent, has_beach_intent, has_amenity_intent
        )
        recommendations = BumblebeeRecommendationService.get_hotel_recommendations(
            limit=3,
            desired_amenities=desired_amenities,
            prefer_cheap=prefer_cheap,
            prefer_no_beach=prefer_no_beach,
            prefer_beach=has_beach_intent,
        )
        serialized = BumblebeeRecommendResultSerializer(
            recommendations,
            many=True,
        )
        return Response(
            {
                "response": response_text,
                "hotels": serialized.data,
            },
            status=status.HTTP_200_OK,
        )