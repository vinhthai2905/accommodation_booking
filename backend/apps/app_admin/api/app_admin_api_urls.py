from django.urls import path

from apps.app_admin.api.private.admin_hotel_registration.views.admin_hotel_registration_views import (
    AdminRegistrationApplicationListView,
    AdminRegistrationApplicationUpdateView
)

from apps.app_admin.api.private.admin_users.views import AdminRolesView, AdminUsersView, AdminUserDetailView

urlpatterns = [
    # ADMIN SESSION
    path("api/admin/hotel/registrations", AdminRegistrationApplicationListView.as_view(), name="admin-hotel-registrations"),
    path("api/admin/hotel/registrations/<int:id_registration>", AdminRegistrationApplicationUpdateView.as_view(), name="admin-hotel-registration-update"),
    
    # ADMIN USER SESSION
    path('api/admin/roles', AdminRolesView.as_view()),
    path('api/admin/users', AdminUsersView.as_view()),
    path('api/admin/users/<uuid:id_user>', AdminUserDetailView.as_view()),
]
