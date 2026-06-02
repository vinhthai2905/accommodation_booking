from django.urls import path
from .public.user_reviews.views.user_reviews_views import UserCreateReviewView

urlpatterns = [
    path('user/review', UserCreateReviewView.as_view(), name='user-create-review'),
]
