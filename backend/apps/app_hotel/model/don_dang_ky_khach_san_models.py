from django.db import models
from apps.app_user.models import NguoiDung
from apps.app_location.model.phuong_models import Phuong
from .khach_san_models import LoaiKhachSan

class TrangThaiDangKyChoice(models.TextChoices):
    CHO_DUYET = "Chờ duyệt", "Chờ duyệt"
    DA_DUYET = "Đã duyệt", "Đã duyệt"
    TU_CHOI = "Từ chối", "Từ chối"

class DonDangKyKhachSan(models.Model):
    id_registration = models.AutoField(
        primary_key=True,
        db_column="id_don_dang_ky",
    )

    id_user = models.ForeignKey(
        NguoiDung,
        on_delete=models.CASCADE,
        db_column="id_nguoi_nop",
        related_name="hotel_registrations",
    )

    id_hotel_type = models.ForeignKey(
        LoaiKhachSan,
        on_delete=models.PROTECT,
        db_column="id_loai_khach_san",
        related_name="hotel_registrations",
    )

    id_ward = models.ForeignKey(
        Phuong,
        on_delete=models.PROTECT,
        db_column="id_phuong",
        related_name="hotel_registrations",
    )

    hotel_name = models.CharField(
        max_length=100,
        db_column="ten_khach_san",
    )

    address = models.CharField(
        max_length=70,
        db_column="dia_chi",
    )

    phone_number = models.CharField(
        max_length=25,
        db_column="so_dien_thoai",
    )

    status = models.CharField(
        max_length=20,
        choices=TrangThaiDangKyChoice.choices,
        default=TrangThaiDangKyChoice.CHO_DUYET,
        db_column="trang_thai",
    )

    reject_reason = models.TextField(
        null=True,
        blank=True,
        db_column="ly_do_tu_choi",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_column="ngay_tao",
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        db_column="ngay_cap_nhat",
    )

    approved_at = models.DateTimeField(
        null=True,
        blank=True,
        db_column="ngay_duyet",
    )

    class Meta:
        db_table = "don_dang_ky_khach_san"
        verbose_name = "Đơn đăng ký khách sạn"
        verbose_name_plural = "Đơn đăng ký khách sạn"

    def __str__(self):
        return f"{self.hotel_name} - {self.status}"
