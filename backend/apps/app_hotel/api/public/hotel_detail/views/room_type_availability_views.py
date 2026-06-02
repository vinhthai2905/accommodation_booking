from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions

from django.db.models import QuerySet

from apps.app_hotel.api.public.hotel_detail.serializers import (
    BookingDateSerializer
)
from apps.app_hotel.api.public.hotel_detail.serializers import RoomTypeAvailabilitySerializer

from apps.app_hotel.models import LoaiPhong, KhachSan
from apps.app_booking.models import DatPhong, ChiTietDatPhong

from uuid import UUID

class RoomTypeAvailabilityView(APIView):
    serializer_class = RoomTypeAvailabilitySerializer
    query_set = LoaiPhong
    hotel_model = KhachSan
    booking_model = DatPhong

    def _get_booked_room_ids_for_dates(
        self, hotel: KhachSan, booking_date_serializer: BookingDateSerializer
    ) -> set[int]:
        """Return set of room_id which have been booked during requested date."""

        overlapping_bookings_hotel: QuerySet[DatPhong] = DatPhong.objects.filter(
            id_hotel=hotel,
            check_in_date__lt=booking_date_serializer.validated_data["check_out"],
            check_out_date__gt=booking_date_serializer.validated_data["check_in"],
        ).exclude(status__in=["COMPLETED", "CANCELLED", "CANCELLED_FAILED"])

        booked_room_ids_set = set(
            ChiTietDatPhong.objects.filter(
                id_booking__in=overlapping_bookings_hotel
            ).values_list("id_room", flat=True)
        )

        return booked_room_ids_set

    def get(self, request: Request, id_hotel: UUID):
        booking_date_serializer = BookingDateSerializer(data=request.query_params)
        booking_date_serializer.is_valid(raise_exception=True)

        try:
            hotel: KhachSan = KhachSan.objects.prefetch_related(
                "room_types", "room_types__rooms"
            ).get(id_hotel=id_hotel)
            hotel_room_types: QuerySet[LoaiPhong] = hotel.room_types.all()
            booked_room_ids = self._get_booked_room_ids_for_dates(
                hotel, booking_date_serializer
            )
        except Exception as e:
            raise exceptions.NotFound("Hotel not found by the given ID.")

        room_availability_serializer = self.serializer_class(
            instance=hotel_room_types,
            many=True,
            context={
                "booked_room_ids": booked_room_ids,
            },
        )

        return Response(room_availability_serializer.data)
