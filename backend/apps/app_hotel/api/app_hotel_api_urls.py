from django.urls import path, include

BASE_URL_INCLUDE_PRIVATE = "apps.app_hotel.api.private"

urlpatterns = [
    # PUBLIC SESSION
    path("api/hotels/search/", include("apps.app_hotel.api.public.hotel_search.hotel_search_urls")),
    path("api/hotel/", include("apps.app_hotel.api.public.hotel_detail.hotel_detail_urls")),
    
    
    # PRIVATE SESSION
    path("api/partner/", include("apps.app_hotel.api.private.partner_hotel_detail.partner_hotel_detail_urls")),
    
]
