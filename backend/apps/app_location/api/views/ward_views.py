from rest_framework.generics import GenericAPIView, ListAPIView

from apps.app_location.models import Phuong
from apps.app_location.api.serializers.ward_serializer import WardSerializer


class WardsView(ListAPIView):
    serializer_class = WardSerializer
    queryset = Phuong.objects.all()