from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.app_location.models import Phuong
from apps.app_location.api.serializers.ward_serializer import WardSerializer


class WardsView(ListCreateAPIView):
    serializer_class = WardSerializer
    queryset = Phuong.objects.all().order_by('-id_ward')

class WardsDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = WardSerializer
    queryset = Phuong.objects.all()
    lookup_field = 'id_ward'