from django.urls import path
from apps.app_booking.api.views.booking_create_views import CreateBookingView
from apps.app_booking.api.views.bookings_user_views import UserBookingListView

urlpatterns = [
    path('api/hotel/booking', CreateBookingView.as_view(), name='create-booking'),
    
    
    path('api/user/bookings', UserBookingListView.as_view(), name='user-bookings'),
]
