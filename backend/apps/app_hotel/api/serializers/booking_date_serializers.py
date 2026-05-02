from rest_framework import serializers
from rest_framework import exceptions


class BookingDateSerializer(serializers.Serializer):
    """Serialize requested date range."""
    
    check_in = serializers.DateField(
        input_formats=["%d-%m-%Y"], required=True
    )
    check_out = serializers.DateField(
        input_formats=["%d-%m-%Y"], required=True
    )

    def validate(self, attrs):
        if attrs["check_out"] <= attrs["check_in"]:
            raise exceptions.ValidationError(
                {"check_out": "Check_out date must be after check_in date"}
            )
        return attrs
