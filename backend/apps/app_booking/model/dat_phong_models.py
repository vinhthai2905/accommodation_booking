import uuid

from django.db import models

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import KhachSan, PhongKhachSan

from apps.common.models import TimeStampedModel


class DatPhong(TimeStampedModel):
    id_booking = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column="id_dat_phong",
    )

    id_user = models.ForeignKey(
        NguoiDung,
        on_delete=models.PROTECT,
        db_column="id_nguoi_dung",
        related_name="bookings",
    )

    id_hotel = models.ForeignKey(
        KhachSan,
        on_delete=models.PROTECT,
        db_column="id_khach_san",
        related_name="bookings",
    )

    check_in_date = models.DateField(
        db_column="ngay_nhan_phong",
    )

    check_out_date = models.DateField(
        db_column="ngay_tra_phong",
    )

    total_room_quantity = models.PositiveSmallIntegerField(
        db_column="tong_so_phong",
    )

    total_guest_quantity = models.PositiveSmallIntegerField(
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

    class Meta:
        db_table = "dat_phong"
        verbose_name = "Đặt phòng"
        verbose_name_plural = "Đặt phòng"

    def __str__(self):
        return str(self.id_booking)


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
