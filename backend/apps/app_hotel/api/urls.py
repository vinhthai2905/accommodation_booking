from . import (
    HotelView,
    HotelImageView,
    HotelRoomView
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
    path("api/hotel/<uuid:id_hotel>", HotelView.as_view()),
    path("api/hotel/<uuid:id_hotel>/room_types", RoomTypeAvailabilityView.as_view()),
    path("api/hotel/<uuid:id_hotel>/images", HotelImageView.as_view(), name="hotel-images")
]