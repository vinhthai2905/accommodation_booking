from rest_framework import serializers

from apps.app_hotel.models import ChinhSachTreEm

class ChildPolicySummarySerializer(serializers.ModelSerializer):
    """Serialize the child policy belongs to a hotel, then expose to public API."""
    
    class Meta:
        model = ChinhSachTreEm
        fields = [
            "max_free_age",
            "max_surcharge_age",
            "adult_age_from",
            "surcharge_amount",
        ]
