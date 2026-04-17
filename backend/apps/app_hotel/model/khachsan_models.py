import uuid

from django.db import models
from django.contrib.gis.db import models as postgis_models

from apps.app_user.models import NguoiDung
from apps.app_location.model.phuong_models import Phuong

class LoaiKhachSan(models.Model):
    id = models.AutoField(
        primary_key=True,
        db_column="id_loai",
    )

    name = models.CharField(
        max_length=20,
        db_column="loai_khach_san",
    )

    slug = models.SlugField(
        max_length=50,
        unique=True,
        db_column="slug",
    )

    class Meta:
        db_table = "loai_khach_san"

    def __str__(self):
        return self.name


class KhachSan(models.Model):
    id_hotel = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column="id_khach_san",
    )

    id_hotel_type = models.ForeignKey(
        LoaiKhachSan,
        on_delete=models.PROTECT,
        db_column="id_loai_khach_san",
        related_name="hotels",
    )

    id_user = models.ForeignKey(
        NguoiDung,
        on_delete=models.CASCADE,
        db_column="id_doi_tac",
        related_name="hotels",
    )

    id_ward = models.ForeignKey(
        Phuong,
        on_delete=models.PROTECT,
        db_column="id_phuong",
        related_name="hotels",
    )
    
    slug = models.SlugField(
        unique=True,
        max_length=70,
        db_column="slug_khach_san",
    )

    name = models.CharField(
        max_length=70,
        db_column="ten",
    )

    address = models.CharField(
        max_length=70,
        db_column="dia_chi",
    )

    location = postgis_models.PointField(
        geography=True,
        null=True,
        blank=True,
        db_column="vi_tri",
    )

    class Meta:
        db_table = "khach_san"

    def __str__(self):
        return self.name