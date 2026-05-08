from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import UserRegisterView, PartnerRegisterView, AuthLoginView, AuthLogoutView, FetchAuthUserView

urlpatterns = [
    path('api/users', UserRegisterView.as_view()),
    path('api/partners', PartnerRegisterView.as_view()),
    path('api/user/login', AuthLoginView.as_view()),
    path('api/user/logout', AuthLogoutView.as_view()),
    
    path('api/user', FetchAuthUserView.as_view()),
    
    path('api/token', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="token_refresh")
]