from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import UserRegisterView, TestAuthView

urlpatterns = [
    path('api/users', UserRegisterView.as_view()),
    
    path('api/test', TestAuthView.as_view()),
    
    path('api/token', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="token_refresh")
]