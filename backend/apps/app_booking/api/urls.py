from django.urls import path
from apps.app_booking.api.views.booking_create_views import CreateBookingView
from apps.app_booking.api.views.bookings_user_views import UserBookingListView
from apps.app_booking.api.views.booking_confirmation_views import BookingConfirmationView

urlpatterns = [
    path('api/hotel/booking', CreateBookingView.as_view(), name='create-booking'),
    
    
    path('api/booking/<uuid:id_booking>/confirmation', BookingConfirmationView.as_view()),
    path('api/user/bookings', UserBookingListView.as_view(), name='user-bookings'),
   
]
