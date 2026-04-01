from django.db import models

from apps.app_khachsan.api.models.khachsan_models import KhachSan
from apps.app_nguoidung.models import NguoiDung


import uuid

class DanhGia(models.Model):
    id_review = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column="ma_danh_gia"
    )
    
    id_hotel = models.ForeignKey(
        to=KhachSan,
        on_delete=models.CASCADE,
        db_column="ma_khach_san"
    )
    
    id_user = models.ForeignKey(
        to=NguoiDung,
        db_column="ma_nguoi_dung",
        related_name="danh_gia"
    )
    
    review_content = models.TextField(
        db_column="noidung_danhgia"
    )
    
    review_star = models.IntegerChoices(
        db_columns="sao_danh_gia"
    )