from django.db import models
from .khach_san_models import KhachSan


class ChinhSachTreEm(models.Model):
    id_child_policy = models.AutoField(primary_key=True, db_column="id_chinh_sach_tre_em")

    id_hotel = models.OneToOneField(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="child_policy",
    )

    max_free_age = models.PositiveSmallIntegerField(
        db_column="tuoi_toi_da_mien_phi"
    )
    max_surcharge_age = models.PositiveSmallIntegerField(
        db_column="tuoi_toi_da_phu_thu"
    )
    adult_age_from = models.PositiveSmallIntegerField(
        db_column="tuoi_bat_dau_tinh_nguoi_lon"
    )
    surcharge_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        db_column="so_tien_phu_thu",
    )

    class Meta:
        db_table = "chinh_sach_tre_em"
        verbose_name_plural = "Chính sách trẻ em"

    def __str__(self):
        return f"Child policy - {self.id_hotel}"