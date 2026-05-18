from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions

from django.db.models import QuerySet
from django.http import QueryDict
from django.contrib.gis.db.models.functions import AsGeoJSON


from apps.app_booking.models import DatPhong
from apps.app_location.models import Phuong
from apps.app_hotel.models import KhachSan, ChinhSachTreEm
from apps.app_hotel.api.public.hotel_search.serializers import (
    HotelSearchResultSerializer,
    HotelSearchResultMapSerializer,
    HotelSearchParamsSerializer,
)

from apps.app_hotel.api.views.base import HotelSearchViewMixin


class HotelSearchResultView(HotelSearchViewMixin, APIView):
    search_params_serializer = HotelSearchParamsSerializer
    hotels_search_result_serializer = HotelSearchResultSerializer

    hotel_model = KhachSan
    booking_model = DatPhong
    ward_model = Phuong

    def get(self, request: Request, *args, **kwargs):
        available_hotels_queryset = self.get_available_hotels_for_requested_date(request)

        serializer = self.hotels_search_result_serializer(instance=available_hotels_queryset, many=True)

        return Response(serializer.data)


class HotelSearchResultMapView(HotelSearchViewMixin, APIView):
    search_params_serializer = HotelSearchParamsSerializer
    hotels_search_result_serializer = HotelSearchResultMapSerializer

    def get(self, request: Request, *args, **kwargs):
        available_hotels_queryset = self.get_available_hotels_for_requested_date(request)

        available_hotels_queryset = available_hotels_queryset.annotate(
            location_json=AsGeoJSON("location")
        )

        serializer = self.hotels_search_result_serializer(
            instance=available_hotels_queryset, many=True
        )

        return Response(serializer.data)
