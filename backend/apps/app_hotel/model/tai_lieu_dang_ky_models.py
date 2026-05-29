from django.db import models
from .don_dang_ky_khach_san_models import DonDangKyKhachSan

class TaiLieuDangKy(models.Model):
    id_document = models.AutoField(
        primary_key=True,
        db_column="id_tai_lieu",
    )

    id_registration = models.OneToOneField(
        DonDangKyKhachSan,
        on_delete=models.CASCADE,
        db_column="id_don_dang_ky",
        related_name="document",
    )

    document_name = models.CharField(
        max_length=50,
        db_column="ten_tai_lieu",
    )

    url = models.CharField(
        max_length=255,
        db_column="url",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_column="ngay_tao",
    )

    class Meta:
        db_table = "tai_lieu_dang_ky"
        verbose_name = "Tài liệu đăng ký"
        verbose_name_plural = "Tài liệu đăng ký"

    def __str__(self):
        return f"{self.document_name} - {self.id_registration.hotel_name}"
