from rest_framework import serializers
from apps.app_hotel.models import KhachSan
from apps.app_hotel.helpers import get_full_address
class HotelBumblebeeRecommendationSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()
    full_address = serializers.SerializerMethodField()
    appealing_price = serializers.SerializerMethodField()
    class Meta:
        model = KhachSan
        fields = [
            "name",
            "full_address",
            "primary_image",
            "appealing_price",
            "is_near_beach",
            "distance_to_beach",
        ]
        read_only_fields = fields
    def get_primary_image(self, obj: KhachSan):
        primary_image = obj.hotel_images.filter(is_primary=True).first()
        return primary_image.url if primary_image else None
    def get_full_address(self, obj: KhachSan):
        return get_full_address(obj)
    def get_appealing_price(self, obj: KhachSan):
        prices = obj.room_types.values_list("price", flat=True)
        return min(prices) if prices else 0
class BumblebeeRecommendInputSerializer(serializers.Serializer):
    limit = serializers.IntegerField(
        default=10,
        min_value=1,
        max_value=50,
        required=False,
    )
    desired_amenities = serializers.ListField(
        child=serializers.CharField(),
        default=list,
        required=False,
        help_text="List of amenity names the guest wants (e.g. 'L\u1ec5 t\u00e2n 24 gi\u1edd')",
    )
class BumblebeeRecommendScoreSerializer(serializers.Serializer):
    price = serializers.FloatField(required=False)
    distance_to_beach = serializers.FloatField(required=False)
    is_near_beach = serializers.BooleanField(required=False)
    amenity_quality_score = serializers.FloatField(required=False)
    top_amenities = serializers.ListField(child=serializers.CharField(), required=False)
    matched_amenities = serializers.ListField(child=serializers.CharField(), required=False)
    desired_amenities_match_count = serializers.IntegerField(required=False)
class BumblebeeRecommendResultSerializer(serializers.Serializer):
    hotel = HotelBumblebeeRecommendationSerializer()
    sub_scores = BumblebeeRecommendScoreSerializer()
    score = serializers.FloatField()