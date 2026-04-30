from django.conf import settings
from django.db import models

from backend.apps.app_booking.model.dat_phong_models import DatPhong
from apps.common.models import TimeStampedModel


class DanhGiaKhachSan(TimeStampedModel):
    id_rating = models.AutoField(
        primary_key=True,
        db_column="id_danh_gia",
    )

    id_booking = models.ForeignKey(
        DatPhong,
        on_delete=models.CASCADE,
        db_column="id_dat_phong",
        related_name="reviews",
    )

    id_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_column="id_nguoi_dung",
        related_name="hotel_reviews",
    )

    content = models.TextField(
        db_column="noi_dung",
    )

    rating = models.CharField(
        max_length=1,
        db_column="so_sao",
    )

    class Meta:
        db_table = "danh_gia_khach_san"

    def __str__(self):
        return f"Review {self.id} - {self.rating}★"
