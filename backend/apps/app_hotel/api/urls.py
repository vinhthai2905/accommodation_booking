from . import HotelRoomView, RoomTypeView, HotelSearchView, HotelView, HotelImageView
from django.urls import path

urlpatterns = [
    path("api/test", HotelRoomView.as_view()),
    path("api/testroomtype", RoomTypeView.as_view()),
    
    path("api/hotels/search", HotelSearchView.as_view()),
    path("api/hotel/<uuid:id_hotel>", HotelView.as_view()),
    path("api/hotel/<uuid:id_hotel>/images", HotelImageView.as_view(), name="hotel-images")
]

