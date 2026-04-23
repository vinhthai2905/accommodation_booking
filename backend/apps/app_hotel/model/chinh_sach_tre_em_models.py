from django.db import models

from .khach_san_models import KhachSan


class ChinhSachTreEm(models.Model):
    id_chinh_sach_tre_em = models.AutoField(primary_key=True)

    id_khach_san = models.OneToOneField(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="chinh_sach_tre_em",
    )

    tuoi_toi_da_mien_phi = models.PositiveSmallIntegerField()
    tuoi_toi_da_phu_thu = models.PositiveSmallIntegerField()
    tuoi_bat_dau_tinh_nguoi_lon = models.PositiveSmallIntegerField()
    so_tien_phu_thu = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        db_table = "chinh_sach_tre_em"

    def __str__(self):
        return f"Chinh sach tre em - {self.id_khach_san_id}"