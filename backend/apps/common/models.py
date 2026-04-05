from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(
        auto_now_add=True,
        db_column="ngay_tao",
    )

    updated_at = models.DateTimeField(
        auto_now=True, 
        db_column="lan_cuoi_cap_nhat"
    )

    class Meta:
        abstract = True
