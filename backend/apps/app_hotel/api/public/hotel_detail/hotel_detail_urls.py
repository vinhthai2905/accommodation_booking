from django.urls import path

from .views import HotelDetailView, HotelImageView, HotelAmenitiesView, RoomTypeAvailabilityView, HotelAmenitiesView
from apps.app_hotel.api.public.hotel_preview.views import HotelBookingPreviewView, ChildPolicyPreviewView, RefundPolicyPreviewView

urlpatterns = [
    path("<uuid:id_hotel>", HotelDetailView.as_view()),
    path("<uuid:id_hotel>/images",HotelImageView.as_view(),name="hotel-images"),
    path("<uuid:id_hotel>/amenities", HotelAmenitiesView.as_view(), name="hotel-amenities"),
    path("<uuid:id_hotel>/room_types", RoomTypeAvailabilityView.as_view()),
    path("<uuid:id_hotel>/booking_summary", HotelBookingPreviewView.as_view(), name="hotel-booking"),
    path("<uuid:id_hotel>/child_policy", ChildPolicyPreviewView.as_view(), name="hotel-child-policy"),
    path("<uuid:id_hotel>/refund_policy", RefundPolicyPreviewView.as_view(), name="hotel-refund-policy"),
]


