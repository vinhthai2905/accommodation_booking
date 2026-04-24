from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_hotel.api.serializers import HotelSerializer
from apps.app_hotel.models import KhachSan

class HotelSearchView(APIView):
    serializer_class = HotelSerializer
    query_set = KhachSan
    
    def get(self, request: Request, *args, **kwargs):
        print(request.query_params)
        
        
        hotel_set = self.query_set.objects.all()
        serializer = self.serializer_class(instance=hotel_set, many=True)
        
        return Response(serializer.data)
        