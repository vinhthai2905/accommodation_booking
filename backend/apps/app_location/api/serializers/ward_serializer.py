from rest_framework import serializers

from apps.app_location.models import Phuong


class WardSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source="id_city.city_name", read_only=True)

    class Meta:
        model = Phuong
        fields = ["id_ward", "id_city", "city_name", "ward_name", "slug"]
        extra_kwargs = {
            "id_ward": {"read_only": True},
        }
        
        
