from rest_framework import serializers
from rest_framework import exceptions

from helpers.validate_booking_date import validate_booking_date

class BookingDateSerializer(serializers.Serializer):
    """Deserialize requested date range."""
    
    check_in = serializers.DateField(
        input_formats=["%d-%m-%Y"], required=True
    )
    check_out = serializers.DateField(
        input_formats=["%d-%m-%Y"], required=True
    )

    def validate(self, attrs):
        validate_booking_date(attrs)
        return attrs
