from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions

from django.db.models import QuerySet
from django.contrib.gis.geos import Polygon
from django.contrib.gis.db.models.functions import AsGeoJSON


from apps.app_booking.models import DatPhong
from apps.app_location.models import Phuong
from apps.app_hotel.models import KhachSan
from apps.app_hotel.api.public.hotel_search.serializers import (
    SearchParamsMapBoundsSerializer,
    HotelSearchParamsSerializer,
    HotelSearchPaginationSerializer,
    HotelSearchResultSerializer,
    HotelSearchResultMapSerializer,
)

from apps.app_hotel.api.base.base import HotelSearchViewMixin

class HotelSearchResultView(HotelSearchViewMixin):
    search_params_serializer = HotelSearchParamsSerializer
    hotels_pagination_serializer = HotelSearchPaginationSerializer
    hotels_search_result_serializer = HotelSearchResultSerializer

    hotel_model = KhachSan
    booking_model = DatPhong
    ward_model = Phuong
    
    def _validate_hotels_pagination_params(self, request: Request):
        pagination_params = {}
        
        pagination_params["page"] = request.query_params.get("page")
        
        serializer = self.hotels_pagination_serializer(data=pagination_params)
        serializer.is_valid(raise_exception=True)
        
        return serializer.validated_data
    
    def _get_paginate_hotels(self, hotels_pagination_params, available_hotels_queryset):
        selected_page = hotels_pagination_params["page"]
        
        offset = (selected_page - 1) * 10
        
        return available_hotels_queryset[offset: offset + 10]
        
    def get(self, request: Request, *args, **kwargs):
        hotels_pagination_params = self._validate_hotels_pagination_params(request)
        
        available_hotels_queryset: QuerySet[KhachSan] = self.get_available_hotels_for_requested_date(
            request
        )
        
        paginate_hotels = self._get_paginate_hotels(hotels_pagination_params, available_hotels_queryset)

        serializer = self.hotels_search_result_serializer(
            instance=paginate_hotels, many=True
        )

        return Response(data={
            "total_hotels": available_hotels_queryset.count(),
            "paginate_hotels": serializer.data
        })


class HotelSearchResultMapView(HotelSearchViewMixin):
    search_params_serializer = HotelSearchParamsSerializer
    search_params_map_bounds_serializer = SearchParamsMapBoundsSerializer
    hotels_search_result_serializer = HotelSearchResultMapSerializer

    def _validate_map_bound_params(self, request: Request):
        map_bound_filters = {}

        map_bound_filters["north"] = request.query_params.get("north")
        map_bound_filters["south"] = request.query_params.get("south")
        map_bound_filters["east"] = request.query_params.get("east")
        map_bound_filters["west"] = request.query_params.get("west")
        map_bound_filters["zoom"] = request.query_params.get("zoom")

        serializer = self.search_params_map_bounds_serializer(data=map_bound_filters)
        serializer.is_valid(raise_exception=True)

        return serializer.validated_data

    def _validate_hotel_search_params(self, request: Request):
        hotel_filters = super()._validate_hotel_search_params(request)
        map_bound_filters = self._validate_map_bound_params(request)

        hotel_filters["map_bounds"] = map_bound_filters

        return hotel_filters
    
    def _get_destination_hotels(self, hotel_filters: dict) -> QuerySet[KhachSan]:
        try:
            # destination_ward = self.ward_model.objects.get(ward_name=f"{hotel_filters["location"]}")
            # destination_hotels: QuerySet[KhachSan] = destination_ward.hotels.all()
            map_bounds = hotel_filters["map_bounds"]
            map_zoom = map_bounds["zoom"]
            
            bounds_polygon = Polygon.from_bbox((
                map_bounds["west"],   
                map_bounds["south"],  
                map_bounds["east"],  
                map_bounds["north"],  
            ))

            bounds_polygon.srid = 4326

            destination_hotels_by_bounds = KhachSan.objects.filter(
                location__intersects=bounds_polygon
            )
            
        except Exception as e:
            raise exceptions.NotFound("Location does not matched.")

        return destination_hotels_by_bounds.prefetch_related("room_types")

    def _get_available_hotels_for_requested_date(
        self,
        destination_hotels_list: QuerySet[KhachSan],
        overlap_bookings: QuerySet[DatPhong],
        requested_rooms: int,
        requested_total_guests: int,
    ) -> QuerySet[KhachSan]:
        available_hotels = super()._get_available_hotels_for_requested_date(
            destination_hotels_list,
            overlap_bookings,
            requested_rooms,
            requested_total_guests,
        )
        
        return available_hotels.annotate(
            location_json=AsGeoJSON("location")
        )

    def get(self, request: Request, *args, **kwargs):
        available_hotels_queryset = self.get_available_hotels_for_requested_date(request)

        serializer = self.hotels_search_result_serializer(
            instance=available_hotels_queryset, many=True
        )

        return Response(serializer.data)
