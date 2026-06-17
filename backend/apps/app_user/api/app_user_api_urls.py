from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import UserRegisterView, PartnerRegisterView
from . import AuthLoginView, AuthLogoutView, FetchAuthUserView
from . import SendVerificationEmailView, VerifyUserEmailView
from apps.app_user.api.public.users.views.user_views import UserProfileView

urlpatterns = [
    path('api/users', UserRegisterView.as_view()),
    path('api/partners', PartnerRegisterView.as_view()),
    
    path('api/auth/user/login', AuthLoginView.as_view()),
    path('api/auth/user/logout', AuthLogoutView.as_view()),
    path('api/auth/user/refresh', FetchAuthUserView.as_view()),
    
    path('api/auth/user/send/email-verification', SendVerificationEmailView.as_view()),
    path('api/auth/user/verify-email/<uidb64>/<token>', VerifyUserEmailView.as_view(), name="verification-link"),
    
    path('api/token', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    
    path('api/public/users/me', UserProfileView.as_view(), name='public-user-profile'),
]