from django.db import models

class TrangThaiDatPhong(models.TextChoices):
    PENDING = "PENDING", "Chờ xác nhận"
    CONFIRMED = "CONFIRMED", "Đã xác nhận"
    CANCELLED = "CANCELLED", "Đã hủy"
    COMPLETED = "COMPLETED", "Hoàn tất"