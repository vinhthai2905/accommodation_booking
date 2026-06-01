from django.urls import path

from . import BookingCreateView, BookingConfirmationView, UserBookingListView, BookingCancelView

from . import PartnerBookingListView, PartnerBookingStatusUpdateView, PartnerBookingDetailView

urlpatterns = [
    path("api/hotel/booking", BookingCreateView.as_view(), name="create-booking"),
    path(
        "api/user/booking/<uuid:id_booking>/confirmation", BookingConfirmationView.as_view()
    ),
    path("api/user/booking/<uuid:id_booking>/cancel", BookingCancelView.as_view(), name="cancel-booking"),
    path("api/user/bookings", UserBookingListView.as_view(), name="user-bookings"),
    
    
    # PRIVATE SESSON
    path(
        "api/partner/hotel/bookings",
        PartnerBookingListView.as_view(),
        name="partner-bookings",
    ),
    path(
        "api/partner/hotel/bookings/<uuid:id_booking>/status",
        PartnerBookingStatusUpdateView.as_view(),
        name="partner-booking-status-update",
    ),
    path(
        "api/partner/hotel/bookings/<uuid:id_booking>",
        PartnerBookingDetailView.as_view(),
        name="partner-booking-detail",
    ),
]
