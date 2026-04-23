from . import HotelRoomView, RoomTypeView
from django.urls import path

urlpatterns = [
    path("api/test", HotelRoomView.as_view()),
    path("api/testroomtype", RoomTypeView.as_view())
]

