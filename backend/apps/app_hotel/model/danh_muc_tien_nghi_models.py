from django.db import models

from .khach_san_models import KhachSan
from .phong_models import LoaiPhong


class DanhMucTienNghi(models.Model):
    id_amenity_category = models.AutoField(
        primary_key=True,
        db_column="id_danh_muc_tien_nghi",
    )

    name = models.CharField(
        max_length=100,
        db_column="ten_danh_muc_tien_nghi",
    )

    slug = models.SlugField(
        max_length=100,
        unique=True,
        db_column="slug",
    )

    class Meta:
        db_table = "danh_muc_tien_nghi"
        verbose_name = "Danh mục tiện nghi"
        verbose_name_plural = "Danh mục tiện nghi"
        ordering = ['-id_amenity_category']

    def __str__(self):
        return self.name