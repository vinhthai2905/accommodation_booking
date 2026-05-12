from . import HotelSearchResultView

from . import HotelDetailView, RoomTypeAvailabilityView


from . import (
    HotelImageView,
    ChildPolicyPreviewView,
    HotelBookingPreviewView,
)

from . import (
    PartnerRoomTypeListView,
    PartnerRoomView
)

from django.urls import path

urlpatterns = [
    path("api/hotels/search", HotelSearchResultView.as_view()),
    path("api/hotel/<uuid:id_hotel>", HotelDetailView.as_view()),
    path("api/hotel/<uuid:id_hotel>/room_types", RoomTypeAvailabilityView.as_view()),
    path("api/hotel/<uuid:id_hotel>/booking_summary", HotelBookingPreviewView.as_view(), name="hotel-booking"),
    path("api/hotel/<uuid:id_hotel>/child_policy", ChildPolicyPreviewView.as_view(), name="hotel-child-policy"),
    
    
    path("api/hotel/<uuid:id_hotel>/images",HotelImageView.as_view(),name="hotel-images"),
    
    
    # PRIVATE SESSION
    path("api/partner/hotel/room_types", PartnerRoomTypeListView.as_view(), name="partner-hotel-room-types"),
    path("api/partner/hotel/room_type/<int:id_room_type>/rooms", PartnerRoomView.as_view(), name="partner-hotel-rooms")
]
