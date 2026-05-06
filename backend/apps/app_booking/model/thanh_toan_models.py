from django.db import models

from .hoa_don_models import HoaDon


class ThanhToan(models.Model):
    id_payment = models.AutoField(
        primary_key=True,
        db_column="id_thanh_toan",
    )
    
    id_payment_service = models.CharField(
        max_length=100,
        unique=True,
        null=True,
        blank=True,
        db_column="id_giao_dich_online"
    )

    id_invoice = models.OneToOneField(
        HoaDon,
        on_delete=models.CASCADE,
        db_column="id_hoa_don",
        related_name="payments",
    )

    paid_at = models.DateTimeField(db_column="ngay_thanh_toan")
    
    payment_method = models.CharField(
        max_length=10,
        null=True,
        db_column="phuong_thuc_thanh_toan",
    )
    
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        db_column="so_tien_thanh_toan",
    )

    class Meta:
        db_table = "thanh_toan"
        verbose_name = "Thanh toán"
        verbose_name_plural = "Thanh toán"

    def __str__(self):
        return f"Payment {self.id} - Invoice {self.invoice_id}"