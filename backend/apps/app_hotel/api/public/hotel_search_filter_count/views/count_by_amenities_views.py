from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from apps.app_hotel.models import LoaiTienNghi, TienNghiKhachSan, TienNghiPhong, KhachSan
from apps.app_hotel.api.views.base import HotelSearchViewMixin
from apps.app_hotel.api.public.hotel_search.serializers import HotelSearchParamsSerializer
from apps.app_hotel.api.public.hotel_search_filter_count.serializers import HotelCountByAmenitiesSerializer

class HotelCountByAmenitiesView(HotelSearchViewMixin, APIView):
    search_params_serializer = HotelSearchParamsSerializer
    
    def _get_hotel_ids_for_count(self, request: Request):
        try:
            available_hotels = self.get_available_hotels_for_requested_date(request)
            hotel_ids = list(available_hotels.values_list("id_hotel", flat=True))
        except Exception:
            hotel_ids = list(KhachSan.objects.values_list("id_hotel", flat=True))
            
        return hotel_ids
    
    def _get_amenities_hotel_count(self, hotel_ids):
        amenities_hotel_count_map = {}

        hotel_amenities = (
            TienNghiKhachSan.objects
            .filter(id_hotel__in=hotel_ids, id_amenity_type__scope="Công cộng")
            .values("id_amenity_type_id", "id_amenity_type__name", "id_hotel__name")
        )
        
        for item in hotel_amenities:
            amenities_hotel_count_map.setdefault(item["id_amenity_type_id"], set()).add(item["id_hotel__name"])
            
        return amenities_hotel_count_map
            
    def _add_hotel_count_to_each_amenity(self, hotel_ids):
        amenities_hotel_count_map = self._get_amenities_hotel_count(hotel_ids)
        
        all_amenities_type = (
            LoaiTienNghi.objects
            .filter(scope="Công cộng")
        )
        
        for amenity in all_amenities_type:
            hotel_set = amenities_hotel_count_map.get(amenity.id_amenity_type, set())
            amenity.hotel_count = len(hotel_set)
            
            
        return all_amenities_type

    def get(self, request: Request, *args, **kwargs):
        hotel_ids = self._get_hotel_ids_for_count(request)

        all_amenities_type = self._add_hotel_count_to_each_amenity(hotel_ids)

        serializer = HotelCountByAmenitiesSerializer(all_amenities_type, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
