from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_hotel.api.serializers import HotelSerializer, HotelSearchParamsSerializer
from apps.app_hotel.models import KhachSan


class HotelSearchView(APIView):
    serializer_class = HotelSerializer
    query_set = KhachSan

    def _get_params(self, request: Request):
        raw_params = {
            "check_in": request.query_params.get("checkIn"),
            "check_out": request.query_params.get("checkOut"),
            "location": request.query_params.get("location"),
            "rooms": request.query_params.get("rooms"),
            "adults": request.query_params.get("adults"),
            # "children": request.GET.get("children", None),
        }

        serializer = HotelSearchParamsSerializer(data=raw_params)
        serializer.is_valid(raise_exception=True)
        return serializer.validated_data


    def get(self, request: Request, *args, **kwargs):
        test = self._get_params(request)

        hotel_set = self.query_set.objects.all()
        serializer = self.serializer_class(instance=hotel_set, many=True)

        return Response(serializer.data)
