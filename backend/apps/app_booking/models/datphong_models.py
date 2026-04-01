from django.conf import settings
from django.db import models

import uuid

class TrangThaiDatPhong(models.TextChoices):
        PENDING = "PENDING", "Chờ xác nhận"
        CONFIRMED = "CONFIRMED", "Đã xác nhận"
        CANCELLED = "CANCELLED", "Đã hủy"
        COMPLETED = "COMPLETED", "Hoàn tất"

class DatPhong(models.Model):

    id_booking = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column="ma_dat_phong",
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="bookings",
        db_column="ma_nguoi_dung",
    )

    room_type = models.ForeignKey(
        "app_khachsan.LoaiPhong",
        on_delete=models.PROTECT,
        related_name="bookings",
        db_column="ma_loai_phong",
    )

    check_in_date = models.DateField(
        db_column="ngay_nhan_phong",
    )

    check_out_date = models.DateField(
        db_column="ngay_tra_phong",
    )

    room_quantity = models.PositiveIntegerField(
        default=1,
        db_column="so_luong_phong",
    )

    adults = models.PositiveIntegerField(
        default=1,
        db_column="so_nguoi_lon",
    )

    children = models.PositiveIntegerField(
        default=0,
        db_column="so_tre_em",
    )

    total_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        db_column="tong_tien",
    )

    status = models.CharField(
        max_length=20,
        choices=TrangThai.choices,
        default=TrangThai.PENDING,
        db_column="trang_thai",
    )

    note = models.TextField(
        null=True,
        blank=True,
        db_column="ghi_chu",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_column="ngay_tao",
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        db_column="ngay_cap_nhat",
    )

    class Meta:
        db_table = "dat_phong"
