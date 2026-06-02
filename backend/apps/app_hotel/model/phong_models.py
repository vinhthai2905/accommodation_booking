from django.db import models

from .khach_san_models import KhachSan
from .giuong_models import Giuong

from apps.common.model.models import TimeStampedModel


class LoaiPhong(TimeStampedModel):
    id_room_type = models.AutoField(
        primary_key=True,
        db_column="id_loai_phong",
    )

    id_hotel = models.ForeignKey(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="room_types",
    )

    type_name = models.CharField(
        max_length=100,
        db_column="ten",
    )

    max_capacity = models.PositiveSmallIntegerField(
        null=True,
        db_column="khach_toi_da",
    )
    
    total_rooms = models.PositiveSmallIntegerField(
        null=True,
        db_column="so_luong_phong"
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        db_column="gia_phong",
    )

    class Meta:
        db_table = "loai_phong"
        verbose_name = "Loại phòng"
        verbose_name_plural = "Loại phòng"

    def __str__(self):
        return f'{self.type_name} room type - {self.id_hotel}'


class ChiTietLoaiPhong(models.Model):
    id_room_type_detail = models.AutoField(
        primary_key=True,
        db_column="id",
    )

    id_room_type = models.ForeignKey(
        LoaiPhong,
        on_delete=models.CASCADE,
        db_column="id_loai_phong",
        related_name="bed_details",
    )

    id_bed = models.ForeignKey(
        Giuong,
        on_delete=models.CASCADE,
        db_column="id_giuong",
        related_name="room_type_details",
    )

    bed_quantity = models.PositiveSmallIntegerField(
        db_column="so_luong_giuong",
    )

    class Meta:
        db_table = "chi_tiet_loai_phong"
        verbose_name = "Chi tiết loại phòng"
        verbose_name_plural = "Chi tiết loại phòng"

    def __str__(self):
        return f"{self.id_room_type} - {self.id_bed}"
    

class PhongKhachSan(models.Model):
    id_room = models.AutoField(
        primary_key=True,
        db_column="id_phong",
    )

    id_room_type = models.ForeignKey(
        LoaiPhong,
        on_delete=models.CASCADE,
        db_column="id_loai_phong",
        related_name="rooms",
    )

    room_name = models.CharField(
        max_length=100,
        db_column="ten_phong",
    )

    class Meta:
        db_table = "phong_khach_san"
        verbose_name = "Phòng khách sạn"
        verbose_name_plural = "Phòng khách sạn"

    def __str__(self):
        return f'{self.room_name}'
    
    def get_hotel_name(self):
        return self.id_room_type.id_hotel