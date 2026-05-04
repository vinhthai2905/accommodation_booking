from django.db import models

class TrangThaiDatPhong(models.TextChoices):
    PENDING   = "PENDING",   "Chờ thanh toán"
    PAID      = "PAID",      "Đã thanh toán"
    CANCELLED = "CANCELLED", "Đã hủy"


class PhuongThucThanhToan(models.TextChoices):
    CASH        = "CASH",        "Tiền mặt"
    CREDIT_CARD = "CREDIT_CARD", "Thẻ tín dụng"
    MOMO        = "MOMO",        "MoMo"
    ZALOPAY     = "ZALOPAY",     "ZaloPay"