from rest_framework import serializers
from .....model.chinh_sach_tre_em_models import ChinhSachTreEm

class ChildrenPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChinhSachTreEm
        fields = [
            "id_child_policy",
            "max_free_age",
            "max_surcharge_age",
            "adult_age_from",
            "surcharge_amount"
        ]
        read_only_fields = ["id_child_policy"]
