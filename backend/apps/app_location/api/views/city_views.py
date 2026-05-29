from rest_framework.generics import ListAPIView
from apps.app_location.models import ThanhPho
from apps.app_location.api.serializers.city_serializer import CitySerializer

class CitiesView(ListAPIView):
    serializer_class = CitySerializer
    queryset = ThanhPho.objects.all().order_by('city_name')
