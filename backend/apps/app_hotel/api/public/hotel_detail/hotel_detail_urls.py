from django.urls import path

from .views import HotelDetailView, RoomTypeAvailabilityView
from apps.app_hotel.api.public.booking_preview.views import HotelBookingPreviewView, ChildPolicyPreviewView
from apps.app_hotel.api.views import HotelImageView

urlpatterns = [
    path("<uuid:id_hotel>", HotelDetailView.as_view()),
    path("<uuid:id_hotel>/room_types", RoomTypeAvailabilityView.as_view()),
    path("<uuid:id_hotel>/booking_summary", HotelBookingPreviewView.as_view(), name="hotel-booking"),
    path("<uuid:id_hotel>/child_policy", ChildPolicyPreviewView.as_view(), name="hotel-child-policy"),
    path("<uuid:id_hotel>/images",HotelImageView.as_view(),name="hotel-images"),
    
]


