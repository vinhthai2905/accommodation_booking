from django.db import models

class TrangThaiDatPhong(models.TextChoices):
    PENDING   = "PENDING",  "Chờ nhận phòng"
    CONFIRMED      = "CONFIRMED", "Đã nhận phòng"
    COMPLETED = "COMPLETED", "Đã trả phòng"
    CANCELLED = "CANCELLED", "Đã hủy"



class TrangThaiThanhToan(models.TextChoices):
    PENDING   = "PENDING_PAYMENT",  "Chờ thanh toán"
    PAID      = "PAID",      "Đã thanh toán"
    PENDING_REFUND = "PENDING_REFUND", "Chờ hoàn tiền"
    REFUNDED = "REFUNDED", "Đã hoàn tiền"
    FAILED = "FAILED", "Thanh toán thất bại"

class PhuongThucThanhToan(models.TextChoices):
    CASH        = "CASH",        "Tiền mặt"
    CREDIT_CARD = "CREDIT_CARD", "Thẻ tín dụng"
    MOMO        = "MOMO",        "MoMo"
    ZALOPAY     = "ZALOPAY",     "ZaloPay"