from . import (
    PartnerRoomTypeListView,
    PartnerRoomTypeView,
    PartnerRoomTypeRoomsListView,
    PartnerRoomTypeDetailsListView,
    PartnerRoomTypeDetailView,
    PartnerBedListView,
    PartnerHotelView,
    PartnerHotelImageListView,
    PartnerHotelImageDetailView,
    PartnerHotelAmenityListView,
    PartnerHotelAmenityDetailView,
    AvailableAmenityTypeListView,
    AvailableAmenityTypeDetailView,
    PartnerHotelCategoryAmenitiesListView,
    PartnerHotelCategoryListView,
    PartnerHotelCategoryDetailView,
    UpdateHotelsNearBeachView,
    HotelTypeListView,
    PartnerHotelRegistrationView,
)

from .public.hotel_partner_registration.views.admin_onboarding_views import (
    AdminRegistrationApplicationListView,
    AdminRegistrationApplicationUpdateView
)

from django.urls import path, include

BASE_URL_INCLUDE_PRIVATE = "apps.app_hotel.api.private"

urlpatterns = [
    # PUBLIC SESSION
    path("api/hotels/search/", include("apps.app_hotel.api.public.hotel_search.hotel_search_urls")),
    path("api/hotel/", include("apps.app_hotel.api.public.hotel_detail.hotel_detail_urls")),
    
    
    # PRIVATE SESSION
    path("api/partner/hotel", PartnerHotelView.as_view(), name="partner-hotel-info"),
    path("api/partner/hotel/update-near-beach", UpdateHotelsNearBeachView.as_view(), name="update-hotels-near-beach"),
    path("api/partner/hotel/images", PartnerHotelImageListView.as_view(), name="partner-hotel-images"),
    path("api/partner/hotel/images/<int:id_hotel_image>", PartnerHotelImageDetailView.as_view(), name="partner-hotel-image-detail"),
    
    
    # Hotel's amenities
    path("api/partner/hotel/amenities", PartnerHotelAmenityListView.as_view(), name="partner-hotel-amenities"),
    path("api/partner/hotel/amenities/<int:id_hotel_amenity>", PartnerHotelAmenityDetailView.as_view(), name="partner-hotel-amenity-detail"),
    path("api/partner/hotel/available-amenities", AvailableAmenityTypeListView.as_view(), name="partner-hotel-available-amenities"),
    path("api/partner/hotel/available-amenities/<int:id_amenity_type>", AvailableAmenityTypeDetailView.as_view(), name="partner-hotel-available-amenity-detail"),
    
    
    # Hotel's amenities category
    path("api/partner/hotel/category-amenities", PartnerHotelCategoryListView.as_view(), name="partner-hotel-category-list"),
    path("api/partner/hotel/category-amenities/<int:id_amenity_category>", PartnerHotelCategoryDetailView.as_view(), name="partner-hotel-category-detail"),
    path("api/partner/hotel/category-amenities/<int:id_amenity_category>/amenities", PartnerHotelCategoryAmenitiesListView.as_view(), name="partner-hotel-category-amenities"),
    
    
    # Hotel's room types
    path("api/partner/hotel/room_types", PartnerRoomTypeListView.as_view(), name="partner-hotel-room-types"),
    path("api/partner/hotel/room_type/<int:id_room_type>", PartnerRoomTypeView.as_view(), name="partner-hotel-room-type-manage"),
    path("api/partner/hotel/room_type/<int:id_room_type>/rooms", PartnerRoomTypeRoomsListView.as_view(), name="partner-hotel-rooms"),
    
    
    # Hotel's room types detail 
    path("api/partner/hotel/beds", PartnerBedListView.as_view(), name="partner-hotel-beds"),
    path("api/partner/hotel/room_type/<int:id_room_type>/bed_details", PartnerRoomTypeDetailsListView.as_view(), name="partner-hotel-room-type-bed-details"),
    path(
        "api/partner/hotel/room_type/<int:id_room_type>/bed_details/<int:id_room_type_detail>", 
        PartnerRoomTypeDetailView.as_view(), 
        name="partner-hotel-room-type-bed-detail-item"
    ),
    path("api/partner/hotel-types", HotelTypeListView.as_view(), name="partner-hotel-types"),
    path("api/partner/hotel/register", PartnerHotelRegistrationView.as_view(), name="partner-hotel-registration"),
    
    
    # ADMIN SESSION
    path("api/admin/hotel/registrations", AdminRegistrationApplicationListView.as_view(), name="admin-hotel-registrations"),
    path("api/admin/hotel/registrations/<int:id_registration>", AdminRegistrationApplicationUpdateView.as_view(), name="admin-hotel-registration-update"),
]
