from . import (
    HotelSearchResultView,
    HotelSearchResultMapView
)

from . import HotelDetailView, RoomTypeAvailabilityView


from . import (
    HotelImageView,
    ChildPolicyPreviewView,
    HotelBookingPreviewView,
)

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
)

from django.urls import path

urlpatterns = [
    path("api/hotels/search", HotelSearchResultView.as_view()),
    path("api/hotels/search/map", HotelSearchResultMapView.as_view()),
    
    path("api/hotel/<uuid:id_hotel>", HotelDetailView.as_view()),
    path("api/hotel/<uuid:id_hotel>/room_types", RoomTypeAvailabilityView.as_view()),
    path("api/hotel/<uuid:id_hotel>/booking_summary", HotelBookingPreviewView.as_view(), name="hotel-booking"),
    path("api/hotel/<uuid:id_hotel>/child_policy", ChildPolicyPreviewView.as_view(), name="hotel-child-policy"),
    
    
    path("api/hotel/<uuid:id_hotel>/images",HotelImageView.as_view(),name="hotel-images"),
    
    
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
]

