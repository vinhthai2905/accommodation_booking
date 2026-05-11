from rest_framework import serializers
from rest_framework import exceptions

from apps.app_hotel.models import PhongKhachSan

from helpers import validate_booking_date


class BookingCreateSerializer(serializers.Serializer):
    """Serialize input data for creating a booking.

    Fields are required by default unless marked with required=False
    """

    # Guest Details
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=25)
    country = serializers.CharField(max_length=20, required=False, allow_blank=True)

    # Booking Details
    id_hotel = serializers.UUIDField()
    selected_rooms = serializers.PrimaryKeyRelatedField(
        queryset=PhongKhachSan.objects.all(), many=True
    )

    # Guests
    children_ages = serializers.ListField(
        child=serializers.IntegerField(), required=False, allow_empty=True
    )
    total_adults = serializers.IntegerField()
    total_children = serializers.IntegerField(required=False)

    # Extra Info
    check_in = serializers.DateField(input_formats=["%d-%m-%Y", "%Y-%m-%d"])
    check_out = serializers.DateField(input_formats=["%d-%m-%Y", "%Y-%m-%d"])
    check_in_time = serializers.CharField(
        max_length=20, required=False, allow_blank=True
    )
    note = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        if len(attrs["children_ages"]) != int(attrs["total_children"]):
            raise exceptions.ValidationError(
                {"children_ages": "Children and children ages are not consistent."}
            )

        validate_booking_date(attrs)

        return attrs
