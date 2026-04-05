import uuid

from django.db import models

from app_nguoidung.models import NguoiDung
from app_khachsan.models.phong_models import LoaiPhong


class DatPhong(models.Model):
    id_booking = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column="id_dat_phong",
    )

    id_room_type = models.ForeignKey(
        LoaiPhong,
        on_delete=models.PROTECT,
        db_column="id_loai_phong",
        related_name="bookings",
    )

    id_user = models.ForeignKey(
        NguoiDung,
        on_delete=models.PROTECT,
        db_column="id_nguoi_dung",
        related_name="bookings",
    )

    checkin_date = models.DateField(
        db_column="ngay_nhan_phong",
    )

    checkout_date = models.DateField(
        db_column="ngay_tra_phong",
    )

    room_quantity = models.SmallIntegerField(
        db_column="so_luong_phong",
    )

    guest_quantity = models.SmallIntegerField(
        db_column="so_luong_khach",
    )

    note = models.TextField(
        null=True,
        blank=True,
        db_column="ghi_chu",
    )

    status = models.CharField(
        max_length=10,
        db_column="trang_thai",
    )

    payment_method = models.CharField(
        max_length=10,
        db_column="phuong_thuc_thanh_toan",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_column="ngay_tao",
    )

    class Meta:
        db_table = "dat_phong"

    def __str__(self):
        return f"{self.user} - {self.room_type}"