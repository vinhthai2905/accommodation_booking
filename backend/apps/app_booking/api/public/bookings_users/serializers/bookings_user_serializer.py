from rest_framework import serializers

from apps.app_booking.models import DatPhong, HoaDon, ThanhToan
from apps.app_hotel.models import KhachSan
from apps.app_hotel.helpers import get_full_address


class FilterBookingSerializer(serializers.Serializer):
    current_tab = serializers.ChoiceField(
        choices=["upcoming", "past", "cancelled"], default="upcoming"
    )


class UserPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThanhToan
        fields = ["paid_amount", "payment_method", "status"]


class UserBookingHotelSerializer(serializers.Serializer):
    name = serializers.CharField()
    full_address = serializers.SerializerMethodField()
    primary_image = serializers.SerializerMethodField()

    def get_full_address(self, hotel: KhachSan):
        return get_full_address(hotel)

    def get_primary_image(self, hotel: KhachSan):
        primary = hotel.hotel_images.filter(is_primary=True).first()
        return primary.url if primary else None


class UserBookingInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoaDon
        fields = ["total_amount"]


class UserBookingListSerializer(serializers.ModelSerializer):
    hotel = UserBookingHotelSerializer(source="id_hotel", read_only=True)
    invoice = UserBookingInvoiceSerializer(read_only=True)
    payment = UserPaymentSerializer(source="invoice.payments", read_only=True)

    class Meta:
        model = DatPhong
        fields = [
            "id_booking",
            "check_in_date",
            "check_out_date",
            "total_room_quantity",
            "total_adults",
            "total_children",
            "status",
            "note",
            "hotel",
            "invoice",
            "payment",
        ]
        read_only_fields = fields
