import uuid

from django.db import models

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import KhachSan

from apps.common.models import TimeStampedModel
from apps.app_booking.choices import TrangThaiDatPhong

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
    
    check_in_time = models.TimeField(
        null=True,
        db_column="thoi_gian_check_in"
    )

    total_room_quantity = models.PositiveSmallIntegerField(
        db_column="tong_so_phong",
    )

    total_adults = models.PositiveSmallIntegerField(
        null=True,
        db_column="so_nguoi_lon"
    )
    
    total_children = models.PositiveSmallIntegerField(
        null=True,
        db_column="so_tre_em"
    )

    note = models.TextField(
        null=True,
        blank=True,
        db_column="ghi_chu",
    )

    status = models.CharField(
        max_length=10,
        choices=TrangThaiDatPhong.choices,
        default=TrangThaiDatPhong.PENDING,
        db_column="trang_thai",
    )

    class Meta:
        db_table = "dat_phong"
        verbose_name = "Đặt phòng"
        verbose_name_plural = "Đặt phòng"

    def __str__(self):
        return str(f'{self.id_hotel.name} {self.id_booking}')



