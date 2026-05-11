from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_hotel.api.serializers import (
    RoomSerializer,
)
from apps.app_hotel.models import PhongKhachSan


class HotelRoomView(APIView):
    serializer_class = RoomSerializer
    query_set = PhongKhachSan

    def get(self, request: Request, *args, **kwargs):
        phong_khach_san_set = self.query_set.objects.all()
        serializer = self.serializer_class(instance=phong_khach_san_set, many=True)

        return Response(serializer.data)
