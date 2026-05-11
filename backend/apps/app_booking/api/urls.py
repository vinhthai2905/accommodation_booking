from django.urls import path

from . import BookingCreateView, BookingConfirmationView, UserBookingListView

urlpatterns = [
    path('api/hotel/booking', BookingCreateView.as_view(), name='create-booking'),
    
    
    path('api/booking/<uuid:id_booking>/confirmation', BookingConfirmationView.as_view()),
    path('api/user/bookings', UserBookingListView.as_view(), name='user-bookings'),
   
]
