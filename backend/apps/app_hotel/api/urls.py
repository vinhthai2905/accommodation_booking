from . import (
    HotelDetailView,
    HotelImageView,
    HotelRoomView,
    ChildPolicyView,
    HotelBookingSummaryView,
)

from . import (
    RoomTypeAvailabilityView
)

from . import (
    HotelSearchView
)

from django.urls import path

urlpatterns = [
    path("api/test", HotelRoomView.as_view()),
    
    path("api/hotels/search", HotelSearchView.as_view()),
    path("api/hotel/<uuid:id_hotel>/room_types", RoomTypeAvailabilityView.as_view()),
    
    path("api/hotel/<uuid:id_hotel>", HotelDetailView.as_view()),
    path("api/hotel/<uuid:id_hotel>/child_policy", ChildPolicyView.as_view(), name="hotel-child-policy"),
    path("api/hotel/<uuid:id_hotel>/images", HotelImageView.as_view(), name="hotel-images"),
    
    path("api/hotel/<uuid:id_hotel>/booking_summary", HotelBookingSummaryView.as_view(), name="hotel-booking"),
]