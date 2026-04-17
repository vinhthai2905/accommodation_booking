from django.db import models

from apps.app_booking.model.datphong_models import DatPhong

from apps.common.models import TimeStampedModel


class DanhGiaKhachSan(TimeStampedModel):
    id = models.AutoField(
        primary_key=True,
        db_column="id_danh_gia",
    )

    id_booking = models.ForeignKey(
        DatPhong,
        on_delete=models.CASCADE,
        db_column="id_dat_phong",
        related_name="reviews",
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