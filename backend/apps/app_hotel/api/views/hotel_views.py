from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions

from django.db.models import QuerySet
from django.http import QueryDict

from apps.app_hotel.models import KhachSan, ChinhSachTreEm, LoaiPhong
from apps.app_booking.models import DatPhong, ChiTietDatPhong
from apps.app_location.models import Phuong

from apps.app_hotel.api.serializers import HotelSerializer, HotelSearchParamsSerializer

class HotelSearchView(APIView):
    serializer_class = HotelSerializer
    hotel_model = KhachSan
    booking_model = DatPhong
    ward_model = Phuong
    
    def _normalize_search_query_params(self, request: Request) -> QueryDict:
        query_params = request.query_params.copy()

        query_params.setlist("children_ages", request.query_params.getlist("age"))
        query_params.setlist("requested_rooms", request.query_params.getlist("rooms"))

        query_params.pop("age", None)
        query_params.pop("rooms", None)

        return query_params

    def _get_hotel_search_params(self, request: Request) -> dict:
        hotel_filters = {}
        
        query_params = self._normalize_search_query_params(request)
        
        for hotel_query_key in query_params:
            values: list = query_params.getlist(hotel_query_key)
            
            if hotel_query_key == "children_ages":
                hotel_filters[hotel_query_key] = values
            else:
                hotel_filters[hotel_query_key] = values[0]
                
        serializer = HotelSearchParamsSerializer(data=query_params)
        serializer.is_valid(raise_exception=True)
        
        return serializer.validated_data
    
    def _validate_child_adult(self, hotel_filters: dict) -> dict:
        hotel_child_policy: ChinhSachTreEm = self.hotel_model.child_policy
        
        child_age_policies = {
            "max_free_age": hotel_child_policy.max_free_age,
            "max_surcharge_age": hotel_child_policy.max_surcharge_age,
            "adult_age_from": hotel_child_policy.adult_age_from
        }
        
        return hotel_filters
    
    def _get_destination_hotels(self, location) -> QuerySet[KhachSan]:
        try:
            destination_ward = self.ward_model.objects.get(ward_name=f'{location}')
            destination_hotels: QuerySet[KhachSan] = destination_ward.hotels.all()
        except Exception as e:
            raise exceptions.NotFound("Location does not matched.")
        
        return destination_hotels.prefetch_related("room_types")
    
    def _get_overlapping_bookings(
        self, 
        check_in_request, 
        check_out_request, 
        hotels_list
    ) -> QuerySet[DatPhong]:
        """Get all bookings which were overlapped with the current request."""
        
        overlap_bookings: DatPhong = (
            self.booking_model.objects
            .filter(
                check_in_date__lt=check_out_request,
                check_out_date__gt=check_in_request,
                id_hotel__in=hotels_list
            )
            .select_related("id_hotel")
            .prefetch_related("booking_details")
        )
        
        return overlap_bookings
    
    def _get_available_hotels_for_requested_date(
        self,
        destination_hotels_list: QuerySet[KhachSan], 
        overlap_bookings: QuerySet[DatPhong], 
        requested_rooms: int
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
                    booked_rooms_by_hotel_room.get(key, 0)
                    + 1
            )

        for hotel in destination_hotels_list:
            total_available_rooms = 0

            for room_type in hotel.room_types.all():
                key = (
                    hotel.id_hotel,
                    room_type,
                )

                booked_rooms = booked_rooms_by_hotel_room.get(key, 0)
                available_rooms_left = room_type.total_rooms - booked_rooms

                total_available_rooms += available_rooms_left

            if total_available_rooms >= requested_rooms:
                available_hotels.append(hotel)
                
        return available_hotels
    
    def get(self, request: Request, *args, **kwargs): 
        hotel_filters = self._get_hotel_search_params(request)
        
        destination_hotels_list: QuerySet[KhachSan] = (
            self._get_destination_hotels(hotel_filters.get("location"))
        )
        
        overlap_bookings = self._get_overlapping_bookings(
            hotel_filters.get("check_in"), 
            hotel_filters.get("check_out"),
            hotels_list=destination_hotels_list
        )
        
        available_hotels_list = (
            self._get_available_hotels_for_requested_date(
                destination_hotels_list,
                overlap_bookings,
                hotel_filters["requested_rooms"]
            )
        )
        
        serializer = self.serializer_class(instance=available_hotels_list, many=True)

        return Response(serializer.data)
