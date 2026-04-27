from django.db import models

from .khach_san_models import KhachSan
from .phong_models import LoaiPhong


class HinhAnhKhachSan(models.Model):
    id_hinh_anh_ks = models.AutoField(
        primary_key=True,
        db_column="id_hinh_anh_ks",
    )

    id_hotel = models.ForeignKey(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="hotel_images",
    )

    image_name = models.CharField(
        max_length=150,
        db_column="ten_hinh_anh",
    )

    is_primary = models.BooleanField(
        default=False,
        db_column="la_anh_chinh",
    )

    slug = models.SlugField(
        max_length=150,
        db_column="slug",
    )

    url = models.CharField(
        max_length=500,
        db_column="url",
    )

    class Meta:
        db_table = "hinh_anh_khach_san"
        verbose_name = "Hình ảnh khách sạn"
        verbose_name_plural = "Hình ảnh khách sạn"

    def __str__(self):
        return f'{self.image_name} - {self.id_hotel.name}'


class HinhAnhPhong(models.Model):
    id = models.AutoField(
        primary_key=True,
        db_column="id_hinh_anh_p",
    )

    id_room_type = models.ForeignKey(
        LoaiPhong,
        on_delete=models.CASCADE,
        db_column="id_loai_phong",
        related_name="room_type_images",
    )

    image_name = models.CharField(
        max_length=150,
        db_column="ten_hinh_anh",
    )

    slug = models.SlugField(
        max_length=150,
        db_column="slug",
    )

    url = models.CharField(
        max_length=500,
        db_column="url",
    )

    class Meta:
        db_table = "hinh_anh_phong"
        verbose_name = "Hình ảnh phòng"
        verbose_name_plural = "Hình ảnh phòng"

    def __str__(self):
        return self.image_name