from rest_framework import serializers

from apps.app_booking.models import DatPhong, HoaDon, ThanhToan
from apps.app_user.models import NguoiDung

from apps.app_hotel.models import KhachSan
from apps.app_hotel.helpers import get_full_address


class PartnerUserBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model=NguoiDung
        fields=["email"]

class PartnerPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThanhToan
        fields = ["paid_amount", "payment_method", "status"]


class PartnerBookingHotelSerializer(serializers.Serializer):
    name = serializers.CharField()
    full_address = serializers.SerializerMethodField()
    primary_image = serializers.SerializerMethodField()

    def get_full_address(self, hotel: KhachSan):
        return get_full_address(hotel)

    def get_primary_image(self, hotel: KhachSan):
        primary = hotel.hotel_images.filter(is_primary=True).first()
        return primary.url if primary else None


class PartnerBookingInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoaDon
        fields = ["total_amount"]


class PartnerBookingListSerializer(serializers.ModelSerializer):
    booking_user = PartnerUserBookingSerializer(source="id_user", read_only=True)
    invoice = PartnerBookingInvoiceSerializer(read_only=True)
    payment = PartnerPaymentSerializer(source="invoice.payments", read_only=True)

    class Meta:
        model = DatPhong
        fields = [
            "booking_user",
            "id_booking",
            "check_in_date",
            "check_out_date",
            "total_room_quantity",
            "total_adults",
            "total_children",
            "status",
            "note",
            "invoice",
            "payment",
        ]
        
        read_only_fields = fields