from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from apps.app_hotel.model.khach_san_models import LoaiKhachSan
from apps.app_admin.api.private.admin_hotel_types.serializers.admin_hotel_types_serializers import AdminHotelTypeSerializer

class AdminHotelTypeListView(APIView):
    def get(self, request):
        hotel_types = LoaiKhachSan.objects.all().order_by('-id')
        serializer = AdminHotelTypeSerializer(hotel_types, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AdminHotelTypeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AdminHotelTypeDetailView(APIView):
    def get_object(self, pk):
        return get_object_or_404(LoaiKhachSan, pk=pk)

    def get(self, request, pk):
        hotel_type = self.get_object(pk)
        serializer = AdminHotelTypeSerializer(hotel_type)
        return Response(serializer.data)

    def put(self, request, pk):
        hotel_type = self.get_object(pk)
        serializer = AdminHotelTypeSerializer(hotel_type, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request, pk):
        hotel_type = self.get_object(pk)
        serializer = AdminHotelTypeSerializer(hotel_type, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        hotel_type = self.get_object(pk)
        hotel_type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
