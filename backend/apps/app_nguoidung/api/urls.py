from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import UserRegisterView, LoginView, LogoutView

urlpatterns = [
    path('api/users', UserRegisterView.as_view()),
    
    path('api/user/login', LoginView.as_view()),
    path('api/user/logout', LogoutView.as_view()),
    
    path('api/token', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="token_refresh")
]