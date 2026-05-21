
from .views import (
    HotelImageView,
)


from .public.hotel_search.views import (
    HotelSearchResultView,
    HotelSearchResultMapView
)

from .public.hotel_detail.views import (
    HotelDetailView,
    RoomTypeAvailabilityView
)

from .public.booking_preview import (
    HotelBookingPreviewView,
    ChildPolicyPreviewView
)

from .private.partner_hotel_detail.views.room_type_views import (
    PartnerRoomTypeListView,
    PartnerRoomTypeView,
)

from .private.partner_hotel_detail.views.room_views import (
    PartnerRoomTypeRoomsListView
)

from .private.partner_hotel_detail.views.room_type_detail_views import (
    PartnerBedListView,
    PartnerRoomTypeDetailsListView,
    PartnerRoomTypeDetailView,
)

from .private.partner_hotel_detail.views.hotel_views import (
    PartnerHotelView,
    UpdateHotelsNearBeachView,
)

from .private.partner_hotel_detail.views.hotel_images_views import (
    PartnerHotelImageListView,
    PartnerHotelImageDetailView,
)

from .private.partner_hotel_detail.views.hotel_type_amenities_views import (
    PartnerHotelAmenityListView,
    PartnerHotelAmenityDetailView,
    AvailableAmenityTypeListView,
    AvailableAmenityTypeDetailView,
)

from .private.partner_hotel_detail.views.hotel_category_amenities_views import (
    PartnerHotelCategoryAmenitiesListView,
    PartnerHotelCategoryListView,
    PartnerHotelCategoryDetailView,
)
