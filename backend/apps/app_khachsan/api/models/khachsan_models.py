from django.db import models
from django.contrib.gis.db import models as postgis_models

import uuid

class KhachSan(models.Model):
    id_hotel = models.UUIDField(
        primary_key=True,
        db_column="ma_khach_san",
        default=uuid.uuid4,
        editable=False
    )
    
    slug_hotel = models.SlugField(
        unique=True,
        max_length=80,
        db_column="slug_khach_san"
    )
    
    name_hotel = models.CharField(
        max_length=60,
        db_column="ten_khach_san"
    )
    
    address = models.CharField(
        max_length=50,
        db_column="dia_chi"
    )
    
    location = postgis_models.PointField(
        geography=True,
        null=True,
        blank=True,
        db_column="vi_tri"
    )
    
    class Meta:
        db_table = "khach_san"