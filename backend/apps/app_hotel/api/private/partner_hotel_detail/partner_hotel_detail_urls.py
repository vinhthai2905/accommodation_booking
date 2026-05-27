from django.urls import path

from apps.app_hotel.api import (
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

urlpatterns = [
    path("hotel", PartnerHotelView.as_view(), name="partner-hotel-info"),
    path("hotel/update-near-beach", UpdateHotelsNearBeachView.as_view(), name="update-hotels-near-beach"),
    path("hotel/images", PartnerHotelImageListView.as_view(), name="partner-hotel-images"),
    path("hotel/images/<int:id_hotel_image>", PartnerHotelImageDetailView.as_view(), name="partner-hotel-image-detail"),
    
    # Hotel's amenities
    path("hotel/amenities", PartnerHotelAmenityListView.as_view(), name="partner-hotel-amenities"),
    path("hotel/amenities/<int:id_hotel_amenity>", PartnerHotelAmenityDetailView.as_view(), name="partner-hotel-amenity-detail"),
    path("hotel/available-amenities", AvailableAmenityTypeListView.as_view(), name="partner-hotel-available-amenities"),
    path("hotel/available-amenities/<int:id_amenity_type>", AvailableAmenityTypeDetailView.as_view(), name="partner-hotel-available-amenity-detail"),
    
    # Hotel's amenities category
    path("hotel/category-amenities", PartnerHotelCategoryListView.as_view(), name="partner-hotel-category-list"),
    path("hotel/category-amenities/<int:id_amenity_category>", PartnerHotelCategoryDetailView.as_view(), name="partner-hotel-category-detail"),
    path("hotel/category-amenities/<int:id_amenity_category>/amenities", PartnerHotelCategoryAmenitiesListView.as_view(), name="partner-hotel-category-amenities"),
    
    # Hotel's room types
    path("hotel/room_types", PartnerRoomTypeListView.as_view(), name="partner-hotel-room-types"),
    path("hotel/room_type/<int:id_room_type>", PartnerRoomTypeView.as_view(), name="partner-hotel-room-type-manage"),
    path("hotel/room_type/<int:id_room_type>/rooms", PartnerRoomTypeRoomsListView.as_view(), name="partner-hotel-rooms"),
    
    # Hotel's room types detail 
    path("hotel/beds", PartnerBedListView.as_view(), name="partner-hotel-beds"),
    path("hotel/room_type/<int:id_room_type>/bed_details", PartnerRoomTypeDetailsListView.as_view(), name="partner-hotel-room-type-bed-details"),
    path(
        "hotel/room_type/<int:id_room_type>/bed_details/<int:id_room_type_detail>", 
        PartnerRoomTypeDetailView.as_view(), 
        name="partner-hotel-room-type-bed-detail-item"
    ),
    
    path("hotel-types", HotelTypeListView.as_view(), name="partner-hotel-types"),
    path("hotel/register", PartnerHotelRegistrationView.as_view(), name="partner-hotel-registration"),
]
