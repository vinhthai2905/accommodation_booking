from django.db import models

from .khachsan_models import KhachSan
from .giuong_models import Giuong

from apps.common.models import TimeStampedModel

class LoaiPhong(TimeStampedModel):
    id_room_type = models.AutoField(
        primary_key=True,
        db_column="id_loai_phong",
    )

    id_hotel = models.ForeignKey(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="room_types",
    )

    name = models.CharField(
        max_length=25,
        db_column="ten",
    )

    quantity = models.SmallIntegerField(
        db_column="so_luong_phong",
    )

    max_guests = models.SmallIntegerField(
        db_column="khach_toi_da",
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        db_column="gia_phong",
    )

    class Meta:
        db_table = "loai_phong"

    def __str__(self):
        return self.name


class ChiTietLoaiPhong(models.Model):
    id = models.AutoField(
        primary_key=True,
        db_column="id_chi_tiet_loai_phong",
    )

    id_room_type = models.ForeignKey(
        LoaiPhong,
        on_delete=models.CASCADE,
        db_column="id_loai_phong",
        related_name="bed_details",
    )

    id_bed = models.ForeignKey(
        Giuong,
        on_delete=models.PROTECT,
        db_column="id_giuong",
        related_name="room_type_details",
    )

    quantity = models.SmallIntegerField(
        db_column="so_luong_giuong",
    )

    class Meta:
        db_table = "chi_tiet_loai_phong"
        constraints = [
            models.UniqueConstraint(
                fields=["room_type", "bed"],
                name="unique_room_type_bed",
            )
        ]

    def __str__(self):
        return f"{self.room_type} - {self.bed}"