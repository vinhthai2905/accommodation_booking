from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_hotel.api.serializers import PublicHotelImageSerializer
from apps.app_hotel.models import HinhAnhKhachSan


class HotelImageView(APIView):
    serializer_class = PublicHotelImageSerializer
    image_model = HinhAnhKhachSan

    def get(self, request: Request, id_hotel):
        images = self.image_model.objects.filter(id_hotel=id_hotel)
        
        serializer = self.serializer_class(instance=images, many=True)
        return Response(serializer.data)
