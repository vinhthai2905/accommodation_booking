from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_hotel.api.serializers import HotelSerializer, HotelSearchParamsSerializer
from apps.app_hotel.models import KhachSan, ChinhSachTreEm


class HotelSearchView(APIView):
    serializer_class = HotelSerializer
    query_set = KhachSan

    def _get_search_params(self, request: Request):
        hotel_filters = {}
        
        query_params = request.query_params.copy()
        query_params.setlist("children_ages", request.query_params.getlist("age"))
        query_params.pop("age")
        
        for hotel_query_key in query_params:
            values: list = query_params.getlist(hotel_query_key)
            
            if hotel_query_key == "children_ages":
                hotel_filters[hotel_query_key] = values
            else:
                hotel_filters[hotel_query_key] = values[0]
                
        serializer = HotelSearchParamsSerializer(data=query_params)
        serializer.is_valid(raise_exception=True)
        
        return serializer.validated_data
    
    def _validate_child_adult(self, hotel_filters: dict):
        hotel_child_policy: ChinhSachTreEm = self.query_set.child_policy
        
        max_free_age = hotel_child_policy.max_free_age
        max_surcharge_age = hotel_child_policy.max_surcharge_age
        adult_age_from = hotel_child_policy.adult_age_from
        
        return hotel_filters

    def get(self, request: Request, *args, **kwargs):
        hotel_filters = self._get_search_params(request)
        
        check_in_request = hotel_filters.get("check_in")
        check_out_request = hotel_filters.get("check_out")
        
        hotel_set = self.query_set.objects.all()
        serializer = self.serializer_class(instance=hotel_set, many=True)

        return Response(serializer.data)
