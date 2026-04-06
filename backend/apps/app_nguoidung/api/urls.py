from django.urls import path, include

from . import UserRegisterView

urlpatterns = [
    path('api/users', UserRegisterView.as_view())
]