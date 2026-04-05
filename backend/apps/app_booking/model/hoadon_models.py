from django.db import models

from apps.app_booking.model.datphong_models import DatPhong

class HoaDon(models.Model):
    id = models.AutoField(
        primary_key=True,
        db_column="id_hoa_don",
    )

    id_booking = models.OneToOneField(
        DatPhong,
        on_delete=models.CASCADE,
        db_column="id_dat_phong",
        related_name="invoice",
    )

    paid_at = models.DateTimeField(
        db_column="ngay_thanh_toan",
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        db_column="tong_hoa_don",
    )

    class Meta:
        db_table = "hoa_don"

    def __str__(self):
        return f"Invoice {self.id}"