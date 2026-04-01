from django.db import models

from apps.app_khachsan.api.models.khachsan_models import KhachSan

import uuid

class LoaiPhong(models.Model):
    id_type_room = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        db_column="ma_loai_phong",
    )
    
    name = models.CharField(
        max_length=70,
        db_column="ten_loai_phong"
    )
    
    bed_type = models.CharField(
        max_length=30,
        db_column="loai_giuong"
    )
    
    bed_count = models.CharField(
        max_length=2,
        db_column="so_luong_giuong"
    )
    
    quantity = models.CharField(
        max_length=3,
        db_column="so_luong_phong"
    )
    
    maxGuests = models.CharField(
        max_length=2,
        db_column="khach_toi_da"
    )

    class Meta:
        db_table = "loai_phong"
    

class PhongKhachSan(models.Model):
    id_room = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        db_column="ma_phong",
    )
    
    id_type_room = models.ForeignKey(
        to=LoaiPhong,
        db_column="ma_loai_phong"
    )
    
    id_hotel = models.ForeignKey(
        to=KhachSan,
        on_delete=models.CASCADE,
        db_column="ma_khach_san"
    )

    class Meta:
        db_table = "phong_khach_san"
    

class Giuong(models.Model):
    id_bed = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        db_column="ma_giuong"
    ),
    
    id_room = models.ForeignKey(
        to=LoaiPhong,
        on_delete=models.CASCADE,
        db_column="ma_phong"
    )
    
    name_bed = models.CharField(
        max_length=30,
        db="ten_giuong"
    )

    class Meta:
        db_table = "giuong_khach_san"
