from django.db import models

from .khach_san_models import KhachSan
from .phong_models import LoaiPhong


class LoaiTienNghi(models.Model):
    id_amenity_type = models.AutoField(
        primary_key=True,
        db_column="id_loai_tien_nghi",
    )

    name = models.CharField(
        max_length=40,
        db_column="tien_nghi",
    )

    scope = models.CharField(
        max_length=15,
        db_column="pham_vi",
    )

    slug = models.SlugField(
        max_length=50,
        db_column="slug",
    )

    class Meta:
        db_table = "loai_tien_nghi"
        verbose_name = "Loại tiện nghi"
        verbose_name_plural = "Loại tiện nghi"

    def __str__(self):
        return self.name


class TienNghiKhachSan(models.Model):
    id_hotel_amenity = models.AutoField(
        primary_key=True,
        db_column="id_tien_nghi",
    )

    id_amenity_type = models.ForeignKey(
        LoaiTienNghi,
        on_delete=models.CASCADE,
        db_column="id_loai_tien_nghi",
        related_name="hotel_amenities",
    )

    id_hotel = models.ForeignKey(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="amenities",
    )

    class Meta:
        db_table = "tien_nghi_khach_san"
        verbose_name = "Tiện nghi khách sạn"
        verbose_name_plural = "Tiện nghi khách sạn"

    def __str__(self):
        return f"{self.id_hotel} - {self.id_amenity_type}"
    
class TienNghiPhong(models.Model):
    id_room_amenity = models.AutoField(
        primary_key=True,
        db_column="id_tien_nghi_phong",
    )

    id_amenity_type = models.ForeignKey(
        LoaiTienNghi,
        on_delete=models.CASCADE,
        db_column="id_loai_tien_nghi",
        related_name="room_amenities",
    )

    id_room_type = models.ForeignKey(
        LoaiPhong,
        on_delete=models.CASCADE,
        db_column="id_loai_phong",
        related_name="amenities",
    )

    class Meta:
        db_table = "tien_nghi_phong"
        verbose_name = "Tiện nghi phòng"
        verbose_name_plural = "Tiện nghi phòng"

    def __str__(self):
        return f"{self.id_room_type} - {self.id_amenity_type}"
