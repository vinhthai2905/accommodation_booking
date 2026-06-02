from rest_framework import serializers
from .....model.chinh_sach_models import ChinhSachTreEm, ChinhSachHoanTien

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

class RefundPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChinhSachHoanTien
        fields = [
            "id_refund_policy",
            "is_cancellation_allowed",
            "days_before_arrival_penalty",
            "penalty_percentage"
        ]
        read_only_fields = ["id_refund_policy"]
