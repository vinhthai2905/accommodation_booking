from django.urls import path
from .public.user_reviews.views.user_reviews_views import UserCreateReviewView
from .public.hotel_reviews.views.hotel_reviews_views import HotelReviewListView

urlpatterns = [
    path('user/review/<uuid:id_booking>', UserCreateReviewView.as_view(), name='user-create-review'),
    path('hotel/<uuid:id_hotel>/reviews', HotelReviewListView.as_view(), name='hotel-reviews-list'),
]
