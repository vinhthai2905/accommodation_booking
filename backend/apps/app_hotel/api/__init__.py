from .views import (
    HotelImageView,
)


from .public.hotel_search.views import (
    HotelSearchResultView
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
    PartnerRoomTypeListView
)

from .private.partner_hotel_detail.views.room_views import (
    PartnerRoomView
)
