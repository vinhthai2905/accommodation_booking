from . import HotelRoomView, RoomTypeView, HotelSearchView
from django.urls import path

urlpatterns = [
    path("api/test", HotelRoomView.as_view()),
    path("api/testroomtype", RoomTypeView.as_view()),
    
    path("api/hotels/search", HotelSearchView.as_view())
]

