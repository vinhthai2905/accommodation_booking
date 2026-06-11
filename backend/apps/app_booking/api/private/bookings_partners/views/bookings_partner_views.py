from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions, status

from django.utils import timezone

from apps.app_hotel.models import KhachSan
from apps.app_hotel.api.base.base import PartnerHotelViewMixin

from apps.app_booking.models import DatPhong
from apps.app_booking.api.public.bookings_users.serializers import (
    FilterBookingSerializer,
)
from apps.app_booking.api.private.bookings_partners.serializers import (
    PartnerBookingListSerializer,
)
from apps.app_hotel.api.permissions import IsAuthenticatedPartner
from apps.common.permission import IsAuthenticatedUserActive


class PartnerBookingListView(PartnerHotelViewMixin, APIView):
    """Return all bookings (past and active) for the authenticated partner."""

    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]
    serializer_class = PartnerBookingListSerializer

    def _validate_filtering_bookings(self, current_tab: str):
        if current_tab is None:
            raise exceptions.ValidationError({"tab": "Must be given to filter."})

        current_tab = current_tab.lower()

        filtering_serializer = FilterBookingSerializer(
            data={"current_tab": current_tab}
        )
        filtering_serializer.is_valid(raise_exception=True)

        return filtering_serializer.validated_data["current_tab"]

    def filter_bookings(self, current_tab, hotel: KhachSan):
        today = timezone.localdate()

        bookings = (
            DatPhong.objects
            .select_related("invoice", "id_user", "invoice__payments")
            .filter(id_hotel=hotel)
            .order_by("-created_at")
        )

        if current_tab == "upcoming":
            return bookings.exclude(status__icontains="CANCELLED").filter(
                check_in_date__gte=today
            )

        elif current_tab == "past":
            return bookings.exclude(status__icontains="CANCELLED").filter(
                check_out_date__lt=today
            )

        elif current_tab == "cancelled":
            return bookings.filter(status__icontains="CANCELLED")

        return bookings

    def get(self, request: Request, *args, **kwargs):
        current_tab = self._validate_filtering_bookings(
            request.query_params.get("tab", None)
        )
        hotel = self.get_partner_hotel(request.user)
        
        bookings = self.filter_bookings(current_tab, hotel)

        serializer = self.serializer_class(bookings, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class PartnerBookingStatusUpdateView(PartnerHotelViewMixin, APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]

    def patch(self, request: Request, id_booking, *args, **kwargs):
        hotel = self.get_partner_hotel(request.user)
        try:
            booking = DatPhong.objects.get(id_booking=id_booking, id_hotel=hotel)
        except DatPhong.DoesNotExist:
            raise exceptions.NotFound("Booking not found.")

        new_status = request.data.get("status")
        if new_status not in ["CONFIRMED", "COMPLETED", "CANCELLED"]:
            return Response({"error": "Invalid status update."}, status=status.HTTP_400_BAD_REQUEST)


        booking.status = new_status
        booking.save()

        return Response({"message": "Status updated successfully", "status": new_status}, status=status.HTTP_200_OK)


class PartnerBookingDetailView(PartnerHotelViewMixin, APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]
    
    def get(self, request: Request, id_booking, *args, **kwargs):
        hotel = self.get_partner_hotel(request.user)
        try:
            from apps.app_booking.api.private.bookings_partners.serializers import PartnerBookingDetailSerializer
            booking = DatPhong.objects.select_related("invoice", "id_user", "invoice__payments").get(id_booking=id_booking, id_hotel=hotel)
            serializer = PartnerBookingDetailSerializer(booking)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DatPhong.DoesNotExist:
            raise exceptions.NotFound("Booking not found.")
