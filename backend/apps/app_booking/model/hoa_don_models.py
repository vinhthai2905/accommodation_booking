from django.db import models

from .dat_phong_models import DatPhong


class HoaDon(models.Model):
    id_invoice = models.AutoField(
        primary_key=True,
        db_column="id_hoa_don",
    )

    id_booking = models.OneToOneField(
        DatPhong,
        on_delete=models.CASCADE,
        db_column="id_dat_phong",
        related_name="invoice",
    )

    total_child_surcharge = models.DecimalField(
        null=True,
        max_digits=12,
        decimal_places=2,
        db_column="tong_phu_thu_tre_em",
    )

    room_amount = models.DecimalField(
        null=True,
        max_digits=12,
        decimal_places=2,
        db_column="tong_tien_phong",
    )

    total_amount = models.DecimalField(
        null=True,
        max_digits=12,
        decimal_places=2,
        db_column="tong_hoa_don",
    )

    class Meta:
        db_table = "hoa_don"
        verbose_name = "Hóa đơn"
        verbose_name_plural = "Hóa đơn"

    def __str__(self):
        return f"Invoice {self.id_invoice}"