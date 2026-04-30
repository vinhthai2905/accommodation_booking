from django.urls import path

from .views import WardsView

urlpatterns = [
    path("api/location/ward", view=WardsView.as_view())
]
