from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from apps.app_hotel.models import LoaiTienNghi, TienNghiKhachSan, TienNghiPhong, KhachSan
from apps.app_hotel.api.views.base import HotelSearchViewMixin
from apps.app_hotel.api.public.hotel_search.serializers import HotelSearchParamsSerializer
from apps.app_hotel.api.public.hotel_search_filter_count.serializers import HotelFilterCountSerializer

class HotelFilterCountView(HotelSearchViewMixin, APIView):
    search_params_serializer = HotelSearchParamsSerializer
    
    def _get_hotel_ids_for_filter(self, request: Request):
        try:
            available_hotels = self.get_available_hotels_for_requested_date(request)
            hotel_ids = list(available_hotels.values_list("id_hotel", flat=True))
        except Exception:
            hotel_ids = list(KhachSan.objects.values_list("id_hotel", flat=True))
            
        return hotel_ids

    def get(self, request: Request, *args, **kwargs):
        hotel_ids = self._get_hotel_ids_for_filter(request)

        amenity_hotel_map = {}

        # hotel_amenities = (
        #     TienNghiKhachSan.objects
        #     .prefetch_related("id_amenity_type")
        #     .filter(id_hotel__in=hotel_ids, id_amenity_type__scope="")
        #     .values("id_amenity_type_id", "id_amenity_type__name", "id_hotel_id")
        # )
        
        # for item in hotel_amenities:
        #     amenity_hotel_map.setdefault(item["id_amenity_type_id"], set()).add(item["id_hotel_id"])

        all_amenities = (
            LoaiTienNghi.objects
            .prefetch_related("hotel_amenities")
            .filter(scope="Công cộng")
        )
        
        for amenity in all_amenities:
            amenity_hotel_map[amenity] = amenity.hotel_amenities.all()
            # hotel_set = amenity_hotel_map.get(amenity.id_amenity_type, set())
            # amenity.count = len(hotel_set)

        serializer = HotelFilterCountSerializer(all_amenities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
