from django.db import models

from apps.app_hotel.models import PhongKhachSan
from .dat_phong_models import DatPhong

class ChiTietDatPhong(models.Model):
    id_booking_detail = models.AutoField(
        primary_key=True,
        db_column="id_chi_tiet",
    )

    id_booking = models.ForeignKey(
        DatPhong,
        on_delete=models.CASCADE,
        db_column="id_dat_phong",
        related_name="booking_details",
    )

    id_room = models.ForeignKey(
        PhongKhachSan,
        on_delete=models.PROTECT,
        db_column="id_phong",
        related_name="booking_details",
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        db_column="thanh_tien",
    )

    class Meta:
        db_table = "chi_tiet_dat_phong"
        verbose_name = "Chi tiết đặt phòng"
        verbose_name_plural = "Chi tiết đặt phòng"

    def __str__(self):
        return f"{self.id_booking} - {self.id_room}"
    
class ChiTietKhachTreEm(models.Model):
    id_tre_em = models.AutoField(primary_key=True)
    id_dat_phong = models.ForeignKey(
        DatPhong,
        on_delete=models.CASCADE,
        db_column="id_dat_phong",
        related_name="chi_tiet_khach_tre_em"
    )
    so_tuoi = models.PositiveSmallIntegerField()
    gia_phu_thu = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        db_table = "chi_tiet_khach_tre_em"