from rest_framework import serializers
from apps.app_hotel.api.public.hotel_search.serializers.hotel_search_serializer import HotelSearchResultSerializer


class BumblebeeRecommendInputSerializer(serializers.Serializer):
    w_price = serializers.FloatField(default=1.0, min_value=0.0, required=False)
    w_beach = serializers.FloatField(default=1.0, min_value=0.0, required=False)
    w_amenity = serializers.FloatField(default=1.0, min_value=0.0, required=False)
    limit = serializers.IntegerField(default=10, min_value=1, max_value=50, required=False)

class BumblebeeRecommendScoreSerializer(serializers.Serializer):
    price = serializers.FloatField()
    beach = serializers.FloatField()
    amenity = serializers.FloatField()

class BumbebeeRecommendResultSerializer(serializers.Serializer):
    hotel = HotelSearchResultSerializer()
    sub_scores = BumblebeeRecommendScoreSerializer()
    score = serializers.FloatField()