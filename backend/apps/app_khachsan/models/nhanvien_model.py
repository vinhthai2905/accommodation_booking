import uuid

from app_nguoidung.models import NguoiDung
from app_khachsan.models.khachsan_models import KhachSan

from django.db import models

class NhanVienDoiTac(models.Model):
    id_nhan_vien = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column="id_nhan_vien"
    )

    id_nguoi_dung = models.ForeignKey(
        NguoiDung,
        on_delete=models.CASCADE,
        db_column="id_nguoi_dung",
        related_name="nhan_vien_doi_tac"
    )

    id_khach_san = models.ForeignKey(
        KhachSan,        
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="nhan_vien"
    )

    class Meta:
        db_table = "nhan_vien_doi_tac"
        constraint = [
            models.UniqueConstraint(fields=["id_nguoi_dung", "id_khach_san"])
        ]