from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import UserRegisterView, PartnerRegisterView, AuthLoginView, AuthLogoutView, FetchAuthUserView
from .views.admin_user_views import AdminRolesView, AdminUsersView, AdminUserDetailView

urlpatterns = [
    path('api/users', UserRegisterView.as_view()),
    path('api/partners', PartnerRegisterView.as_view()),
    
    path('api/admin/roles', AdminRolesView.as_view()),
    path('api/admin/users', AdminUsersView.as_view()),
    path('api/admin/users/<uuid:id_user>', AdminUserDetailView.as_view()),

    
    path('api/auth/user/login', AuthLoginView.as_view()),
    path('api/auth/user/logout', AuthLogoutView.as_view()),
    path('api/auth/user/refresh', FetchAuthUserView.as_view()),
    
    path('api/token', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="token_refresh")
]