from django.db.models import QuerySet
from django.http import QueryDict

from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import exceptions, views

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import KhachSan, LoaiPhong, ChinhSachTreEm
from apps.app_booking.models import DatPhong
from apps.app_location.models import Phuong


class PartnerHotelViewMixin:
    def get_partner_hotel(self, partner: NguoiDung):
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def get_room_type(self, hotel, id_room_type: int):
        try:
            return LoaiPhong.objects.get(
                id_room_type=id_room_type,
                id_hotel=hotel,
            )
        except LoaiPhong.DoesNotExist:
            raise exceptions.NotFound(
                detail={
                    "error": "Room type not found or does not belong to your hotel."
                }
            )

    def get_partner_room_type(self, partner, id_room_type):
        hotel = self.get_partner_hotel(partner)

        return self.get_room_type(hotel, id_room_type)


class HotelSearchViewMixin(APIView):
    permission_classes=[AllowAny]
    search_params_serializer = None
    hotels_search_result_serializer = None

    ward_model = Phuong
    hotel_model = KhachSan
    booking_model = DatPhong

    def _normalize_search_query_params(self, request: Request) -> QueryDict:
        query_params = request.query_params.copy()

        query_params.setlist("children_ages", request.query_params.getlist("age"))
        query_params.setlist("requested_rooms", request.query_params.getlist("rooms"))

        query_params.pop("age", None)
        query_params.pop("rooms", None)

        return query_params

    def _validate_hotel_search_params(self, request: Request) -> dict:
        """Normalize each parameter in the query and validate each."""

        hotel_filters = {}
        map_bounds_exclude = {"north", "south", "east", "west", "zoom"}

        query_params = self._normalize_search_query_params(request)

        for hotel_query_key in query_params:
            values: list = query_params.getlist(hotel_query_key)

            if hotel_query_key == "children_ages":
                hotel_filters[hotel_query_key] = values

            elif hotel_query_key not in map_bounds_exclude:
                    hotel_filters[hotel_query_key] = values[0]

        serializer = self.search_params_serializer(data=hotel_filters)
        serializer.is_valid(raise_exception=True)

        return serializer.validated_data

    def _validate_child_adult(self, hotel_filters: dict) -> dict:
        hotel_child_policy: ChinhSachTreEm = self.hotel_model.child_policy

        child_age_policies = {
            "max_free_age": hotel_child_policy.max_free_age,
            "max_surcharge_age": hotel_child_policy.max_surcharge_age,
            "adult_age_from": hotel_child_policy.adult_age_from,
        }

        return hotel_filters

    def _get_destination_hotels(self, hotel_filters: dict) -> QuerySet[KhachSan]:
        try:
            destination_ward = self.ward_model.objects.get(ward_name=f"{hotel_filters.get("location")}")
            destination_hotels: QuerySet[KhachSan] = destination_ward.hotels.all()
        except Exception as e:
            raise exceptions.NotFound("Location does not matched.")

        return destination_hotels.prefetch_related("room_types")

    def _get_overlapping_bookings(
        self, check_in_request, check_out_request, hotels_list
    ) -> QuerySet[DatPhong]:
        """Get all bookings which were overlapped with the current request."""

        overlap_bookings: DatPhong = (
            self.booking_model.objects.filter(
                check_in_date__lt=check_out_request,
                check_out_date__gt=check_in_request,
                id_hotel__in=hotels_list,
            )
            .select_related("id_hotel")
            .prefetch_related("booking_details")
        )

        return overlap_bookings

    def _get_available_hotels_for_requested_date(
        self,
        destination_hotels_list: QuerySet[KhachSan],
        overlap_bookings: QuerySet[DatPhong],
        requested_rooms: int,
        requested_total_guests: int,
    ) -> QuerySet[KhachSan]:
        """Return list of hotels in which each has enough rooms for incoming requested booking."""

        available_hotels: list[KhachSan] = []
        booked_rooms_by_hotel_room = {}

        for booking in overlap_bookings:
            for detail in booking.booking_details.all():
                key = (
                    booking.id_hotel_id,
                    detail.id_room.id_room_type,
                )

                booked_rooms_by_hotel_room[key] = (
                    booked_rooms_by_hotel_room.get(key, 0) + 1
                )

        for hotel in destination_hotels_list:
            total_available_rooms = 0
            total_capacity = 0

            for room_type in hotel.room_types.all():
                key = (
                    hotel.id_hotel,
                    room_type,
                )

                booked_rooms = booked_rooms_by_hotel_room.get(key, 0)

                available_rooms_left = room_type.total_rooms - booked_rooms

                total_available_rooms += available_rooms_left

                total_capacity += available_rooms_left * room_type.max_capacity

            if (
                total_available_rooms >= requested_rooms
                and total_capacity >= requested_total_guests
            ):
                available_hotels.append(hotel.id_hotel)

        return self.hotel_model.objects.filter(id_hotel__in=available_hotels)

    def get_available_hotels_for_requested_date(
        self, request: Request
    ) -> QuerySet[KhachSan]:
        hotel_filters = self._validate_hotel_search_params(request)

        destination_hotels_list: QuerySet[KhachSan] = self._get_destination_hotels(
            hotel_filters
        )

        overlap_bookings: QuerySet[DatPhong] = self._get_overlapping_bookings(
            hotel_filters.get("check_in"),
            hotel_filters.get("check_out"),
            hotels_list=destination_hotels_list,
        )

        available_hotels_list: QuerySet[KhachSan] = (
            self._get_available_hotels_for_requested_date(
                destination_hotels_list,
                overlap_bookings,
                hotel_filters["requested_rooms"],
                hotel_filters["requested_total_guests"],
            )
        )

        return available_hotels_list
