from rest_framework import serializers

from apps.app_booking.models import ThanhToan

from .bookings_user_serializer import UserBookingListSerializer

class IDBookingConfirmationSerializer(serializers.Serializer):
    id_booking = serializers.UUIDField(required=True)
    
    
class BookingConfirmationDetailSerializer(UserBookingListSerializer):
    pass