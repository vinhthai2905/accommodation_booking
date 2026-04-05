from django.db import models

from app_khachsan.models.khachsan_models import KhachSan
from app_khachsan.models.phong_models import LoaiPhong


class LoaiHinhAnh(models.Model):
    id_image_type = models.AutoField(
        primary_key=True,
        db_column="id_loai_hinh_anh",
    )

    name = models.CharField(
        max_length=20,
        db_column="loai_hinh_anh",
    )

    class Meta:
        db_table = "loai_hinh_anh"

    def __str__(self):
        return self.name


class HinhAnhKhachSan(models.Model):
    id_image = models.AutoField(
        primary_key=True,
        db_column="id_hinh_anh",
    )

    id_image_type = models.ForeignKey(
        LoaiHinhAnh,
        on_delete=models.PROTECT,
        db_column="id_loai_hinh_anh",
        related_name="hotel_images",
    )

    id_room_type = models.ForeignKey(
        LoaiPhong,
        on_delete=models.CASCADE,
        db_column="id_loai_phong",
        related_name="images",
        null=True,
        blank=True,
    )

    id_hotel = models.ForeignKey(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="images",
    )

    name = models.CharField(
        max_length=50,
        db_column="ten_hinh_anh",
    )

    slug = models.SlugField(
        max_length=50,
        unique=True,
        db_column="slug",
    )

    url = models.URLField(
        max_length=500,
        db_column="url",
    )

    class Meta:
        db_table = "hinh_anh_khach_san"

    def __str__(self):
        return self.name