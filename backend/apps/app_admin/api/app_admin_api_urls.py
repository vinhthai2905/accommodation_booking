from django.urls import path

from apps.app_admin.api.private.admin_hotel_registration.views.admin_hotel_registration_views import (
    AdminRegistrationApplicationListView,
    AdminRegistrationApplicationUpdateView
)

from apps.app_admin.api.private.admin_users.views import AdminRolesView, AdminUsersView, AdminUserDetailView

from apps.app_admin.api.private.admin_hotel_types.views.admin_hotel_types_views import (
    AdminHotelTypeListView,
    AdminHotelTypeDetailView
)

from apps.app_admin.api.private.admin_statistics.views.admin_hotel_type_stats_views import AdminHotelTypeStatsView


urlpatterns = [
    # ADMIN SESSION
    path("api/admin/hotel/registrations", AdminRegistrationApplicationListView.as_view(), name="admin-hotel-registrations"),
    path("api/admin/hotel/registrations/<int:id_registration>", AdminRegistrationApplicationUpdateView.as_view(), name="admin-hotel-registration-update"),
    
    # ADMIN USER SESSION
    path('api/admin/roles', AdminRolesView.as_view()),
    path('api/admin/users', AdminUsersView.as_view()),
    path('api/admin/users/<uuid:id_user>', AdminUserDetailView.as_view()),
    
    # ADMIN HOTEL TYPES
    path('api/admin/hotel-types', AdminHotelTypeListView.as_view(), name="admin-hotel-types"),
    path('api/admin/hotel-types/<int:pk>', AdminHotelTypeDetailView.as_view(), name="admin-hotel-type-detail"),
    
    # ADMIN STATISTICS
    path('api/admin/statistics/hotel-types', AdminHotelTypeStatsView.as_view(), name="admin-statistics-hotel-types"),
]
