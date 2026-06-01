from rest_framework import serializers
from django.db import models

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


class PartnerBookingDetailSerializer(PartnerBookingListSerializer):
    booked_rooms = serializers.SerializerMethodField()

    class Meta(PartnerBookingListSerializer.Meta):
        fields = PartnerBookingListSerializer.Meta.fields + ["booked_rooms", "check_in_time"]
        read_only_fields = fields

    def get_booked_rooms(self, booking):
        from django.db.models import Count
        # Count rooms grouped by room type name
        room_counts = booking.booking_details.values(
            room_type_name=models.F('id_room__id_room_type__type_name')
        ).annotate(
            quantity=Count('id_booking_detail')
        )
        return list(room_counts)