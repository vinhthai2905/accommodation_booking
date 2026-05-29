from django.urls import path

from .views import HotelSearchResultView, HotelSearchResultMapView
from apps.app_hotel.api.public.hotel_search_filter_count.views import HotelCountByAmenitiesView

urlpatterns = [
    path("", HotelSearchResultView.as_view()),
    path("map", HotelSearchResultMapView.as_view()),
    
    path("amenities/hotel_count", HotelCountByAmenitiesView.as_view()),
    
]


