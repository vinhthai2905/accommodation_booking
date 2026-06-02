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


class ChinhSachHoanTien(models.Model):
    id_refund_policy = models.AutoField(primary_key=True, db_column="id_chinh_sach_hoan_tien")

    id_hotel = models.OneToOneField(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="refund_policy",
    )

    is_cancellation_allowed = models.BooleanField(
        default=True,
        db_column="cho_phep_huy",
    )

    days_before_arrival_penalty = models.PositiveSmallIntegerField(
        default=1,
        db_column="so_ngay_truoc_khi_den_bi_phat",
        help_text="Số ngày còn lại trước khi đến sẽ bị tính phí phạt (VD: 1)"
    )

    penalty_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=10.00,
        db_column="phan_tram_phat",
        help_text="Phần trăm trừ vào số tiền hoàn lại nếu hủy trong thời hạn (VD: 10.00)"
    )

    class Meta:
        db_table = "chinh_sach_hoan_tien"
        verbose_name_plural = "Chính sách hoàn tiền"

    def __str__(self):
        return f"Refund policy - {self.id_hotel}"