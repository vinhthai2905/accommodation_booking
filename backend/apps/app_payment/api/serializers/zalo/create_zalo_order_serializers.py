from rest_framework import serializers

class CreateZaloOrderSerializer(serializers.Serializer):
    booking_id = serializers.IntegerField(required=True)

    def validate_booking_id(self, value):
        if value <= 0:
            raise serializers.ValidationError("booking_id must be greater than 0.")
        return value