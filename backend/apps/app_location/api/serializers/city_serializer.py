from rest_framework import serializers

from apps.app_location.models import ThanhPho

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ThanhPho
        fields = ["id_city", "city_name", "slug"]
        extra_kwargs = {
            "id_city": {"read_only": True},
            "city_name": {"read_only": True},
            "slug": {"read_only": True},
        }
