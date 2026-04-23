from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_hotel.api.serializers import HotelRoomSerializer, RoomTypeSerializer
from apps.app_hotel.models import PhongKhachSan, LoaiPhong

class RoomTypeView(APIView):
    serializer_class = RoomTypeSerializer
    query_set = LoaiPhong
    
    def get(self, request: Request, *args, **kwargs):
        loai_phong_set = self.query_set.objects.all()
        serializer = self.serializer_class(instance=loai_phong_set, many=True)
        
        return Response(serializer.data)

class HotelRoomView(APIView):
    serializer_class = HotelRoomSerializer
    query_set = PhongKhachSan
    
    def get(self, request: Request, *args, **kwargs):
        phong_khach_san_set = self.query_set.objects.all()
        serializer = self.serializer_class(instance=phong_khach_san_set, many=True)
        
        return Response(serializer.data)