from django.urls import path
from apps.app_booking.api.views.booking_create_views import CreateBookingView

urlpatterns = [
    path('api/hotel/booking', CreateBookingView.as_view(), name='create-booking'),
]
