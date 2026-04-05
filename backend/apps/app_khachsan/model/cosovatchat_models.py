from django.db import models

from .khachsan_models import KhachSan

class CoSoVatChat(models.Model):
    id_facility = models.AutoField(
        primary_key=True,
        db_column="id",
    )

    name = models.CharField(
        max_length=20,
        db_column="ten_co_so_vat_chat",
    )

    slug = models.SlugField(
        max_length=50,
        unique=True,
        db_column="slug",
    )

    class Meta:
        db_table = "co_so_vat_chat"

    def __str__(self):
        return self.name


class TienNghiKhachSan(models.Model):
    id_amenity = models.AutoField(
        primary_key=True,
        db_column="id_tien_nghi",
    )

    id_hotel = models.ForeignKey(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="hotel_facilities",
    )

    id_facility = models.ForeignKey(
        CoSoVatChat, 
        on_delete=models.PROTECT,
        db_column="id_co_so_vat_chat",
        related_name="hotels",
    )

    class Meta:
        db_table = "tien_nghi_khach_san"
        constraints = [
            models.UniqueConstraint(
                fields=["hotel", "facility"],
                name="unique_hotel_facility",
            )
        ]

    def __str__(self):
        return f"{self.hotel} - {self.facility}"