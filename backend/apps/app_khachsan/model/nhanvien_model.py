import uuid
from django.db import models

from apps.app_nguoidung.models import NguoiDung
from apps.app_khachsan.models import KhachSan

class NhanVienDoiTac(models.Model):
    id_employee = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column="id_nhan_vien",
    )

    id_user = models.ForeignKey(
        NguoiDung,
        on_delete=models.PROTECT,
        db_column="id_nguoi_dung",
        related_name="partner_staff",
    )

    id_hotel = models.ForeignKey(
        KhachSan,
        on_delete=models.CASCADE,
        db_column="id_khach_san",
        related_name="staffs",
    )

    class Meta:
        db_table = "nhan_vien_doi_tac"
        constraints = [
            models.UniqueConstraint(
                fields=["user", "hotel"],
                name="unique_user_hotel_staff",
            )
        ]