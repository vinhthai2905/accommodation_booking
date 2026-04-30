from rest_framework import serializers
from rest_framework import exceptions


class BookingDateSerializer(serializers.Serializer):
    check_in = serializers.DateField(
        input_formats=["%d-%m-%Y"], required=True, write_only=True
    )
    check_out = serializers.DateField(
        input_formats=["%d-%m-%Y"], required=True, write_only=True
    )

    def validate(self, attrs):
        if attrs["check_out"] <= attrs["check_in"]:
            raise exceptions.ValidationError(
                {"check_out": "Check_out date must be after check_in date"}
            )
        return attrs
