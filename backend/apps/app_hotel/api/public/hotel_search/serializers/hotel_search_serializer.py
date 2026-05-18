from rest_framework import serializers

from apps.app_hotel.models import KhachSan
from apps.app_hotel.helpers import get_full_address
from apps.app_hotel.api.public.hotel_detail.serializers import BookingDateSerializer


class HotelSearchParamsSerializer(BookingDateSerializer):
    """Deserialize hotel search query params."""

    location = serializers.CharField(required=True)
    requested_rooms = serializers.IntegerField(min_value=1, required=True)
    adults = serializers.IntegerField(min_value=1, required=True)
    children = serializers.IntegerField(min_value=0, required=False, default=0)
    children_ages = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=17),
        required=False,
        default=list,
    )

    def _get_effective_total_guests(self, attrs):
        if attrs["children"] > 0:
            attrs["requested_total_guests"] = attrs["adults"] + attrs["children"]
        else:
            attrs["requested_total_guests"] = attrs["adults"]

    def validate(self, attrs):
        self._get_effective_total_guests(attrs)

        return attrs


class HotelSearchResultSerializer(serializers.ModelSerializer):
    """Serialize each hotel which met the search requirements,
    then expose to public API Search Hotels."""

    primary_image = serializers.SerializerMethodField()
    full_address = serializers.SerializerMethodField()
    appealing_price = serializers.SerializerMethodField()

    class Meta:
        model = KhachSan
        fields = [
            "id_hotel",
            "name",
            "full_address",
            "primary_image",
            "appealing_price",
        ]
        read_only_fields = [
            "id_hotel",
            "name",
            "full_address",
            "primary_image",
            "appealing_price",
        ]

    def get_primary_image(self, obj: KhachSan):
        primary_image = obj.hotel_images.filter(is_primary=True).first()
        return primary_image.url if primary_image else None

    def get_full_address(self, obj: KhachSan):
        return get_full_address(obj)
        
    def get_appealing_price(self, hotel: KhachSan):
        all_room_type_prices = hotel.room_types.values_list(
            "price",
            flat=True
        )
        
        if not all_room_type_prices:
            return 0
            
        return min(all_room_type_prices)
    
    
class HotelSearchResultMapSerializer(serializers.ModelSerializer):
    """Serialize each hotel which met the search requirements,
    then expose to public API Search Hotels."""
    
    primary_image = serializers.SerializerMethodField()
    full_address = serializers.SerializerMethodField()
    appealing_price = serializers.SerializerMethodField()
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()
    
    class Meta:
        model = KhachSan
        fields = [
            "id_hotel",
            "name",
            "full_address",
            "primary_image",
            "appealing_price",
            "latitude",
            "longitude",
            
        ]
        read_only_fields = [
            "id_hotel",
            "name",
            "full_adress",
            "primary_image",
            "appealing_price",
            "latitude",
            "longitude",
        ]
    
    def get_appealing_price(self, hotel: KhachSan):
        all_room_type_prices = hotel.room_types.values_list(
            "price",
            flat=True
        )
        
        if not all_room_type_prices:
            return 0
            
        return min(all_room_type_prices)

    def get_full_address(self, obj: KhachSan):
        return get_full_address(obj)
    
    def get_primary_image(self, obj: KhachSan):
        primary_image = obj.hotel_images.filter(is_primary=True).first()
        return primary_image.url if primary_image else None
    
    def get_latitude(self, obj: KhachSan):
        return obj.location.y

    def get_longitude(self, obj: KhachSan):
        return obj.location.x