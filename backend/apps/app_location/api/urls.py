from django.urls import path

from .views.ward_views import WardsView, WardsDetailView
from .views.city_views import CitiesView

urlpatterns = [
    path("api/location/cities", view=CitiesView.as_view()),
    path("api/location/ward", view=WardsView.as_view()),
    path("api/location/ward/<int:id_ward>", view=WardsDetailView.as_view())
]
