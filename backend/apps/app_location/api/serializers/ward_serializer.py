from rest_framework import serializers

from apps.app_location.models import Phuong


class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phuong
        fields = ["id_ward", "id_city", "ward_name", "slug"]
        extra_kwargs = {
            "id_ward": {"read_only": True},
            "id_city": {"write_only": True},
            "ward_name": {"read_only": True},
        }
        
        
