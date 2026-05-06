from rest_framework import serializers

class BookingConfirmationSerializer(serializers.Serializer):
    id_booking = serializers.UUIDField(required=True)
    id_user = serializers.UUIDField(required=True)