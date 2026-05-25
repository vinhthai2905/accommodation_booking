from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.app_ai.services.recommendation_service import RecommendationService
from apps.app_ai.api.public.bumblebee_chatbox.serializers import BumbebeeRecommendResultSerializer

class BumblebeeChatView(APIView):
    def post(self, request, *args, **kwargs):
        user_message = request.data.get("message", "").lower()

        # Analyze intent weights based on keywords
        w_price = 1.0
        w_beach = 1.0
        w_amenity = 1.0

        has_price_intent = any(keyword in user_message for keyword in ["rẻ", "giá", "tiền", "cheap", "cost", "tiết kiệm"])
        has_beach_intent = any(keyword in user_message for keyword in ["biển", "beach", "cát", "sóng", "đại dương"])
        has_amenity_intent = any(keyword in user_message for keyword in ["tiện nghi", "wifi", "bể bơi", "hồ bơi", "pool", "dịch vụ", "ăn sáng"])

        if has_price_intent:
            w_price = 5.0
        if has_beach_intent:
            w_beach = 5.0
        if has_amenity_intent:
            w_amenity = 5.0

        # Select response text based on intents
        if has_price_intent and has_beach_intent and has_amenity_intent:
            response_text = "Mình đã tìm được các khách sạn tại Đà Nẵng đáp ứng tối đa cả ba tiêu chí: giá tốt, gần biển và đầy đủ tiện nghi công cộng cho bạn."
        elif has_price_intent and has_beach_intent:
            response_text = "Ưu tiên tiêu chí giá phòng tiết kiệm và vị trí gần bãi biển nhất, đây là các gợi ý phù hợp nhất cho bạn:"
        elif has_price_intent and has_amenity_intent:
            response_text = "Dành cho nhu cầu phòng giá rẻ nhưng vẫn đầy đủ tiện nghi dịch vụ, mình xin gợi ý các khách sạn sau:"
        elif has_beach_intent and has_amenity_intent:
            response_text = "Nếu bạn muốn ở sát biển và tận hưởng nhiều tiện ích cao cấp, đây là những lựa chọn hàng đầu:"
        elif has_price_intent:
            response_text = "Mình đã chọn lọc ra những khách sạn có mức giá phòng tối ưu và tiết kiệm nhất tại Đà Nẵng dành cho bạn:"
        elif has_beach_intent:
            response_text = "Để thuận tiện di chuyển ra bãi tắm, đây là danh sách các khách sạn có khoảng cách gần biển nhất:"
        elif has_amenity_intent:
            response_text = "Dưới đây là danh sách các khách sạn sở hữu nhiều tiện nghi công cộng (hồ bơi, wifi, nhà hàng...) phong phú nhất:"
        else:
            response_text = "Dựa trên các thông số về giá cả, vị trí gần biển và tiện nghi dịch vụ, mình xin gợi ý danh sách khách sạn tốt nhất sau:"

        recommendations = RecommendationService.get_recommendations(
            w_price=w_price,
            w_beach=w_beach,
            w_amenity=w_amenity,
            limit=3
        )

        serialized = BumbebeeRecommendResultSerializer(recommendations, many=True)

        return Response({
            "response": response_text,
            "hotels": serialized.data
        }, status=status.HTTP_250_200_OK if hasattr(status, 'HTTP_250_200_OK') else status.HTTP_200_OK)