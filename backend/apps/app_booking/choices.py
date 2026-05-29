from django.db import models

class TrangThaiDatPhong(models.TextChoices):
    PENDING   = "PENDING",  "Chờ nhận phòng"
    CONFIRMED      = "CONFIRMED", "Đã nhận phòng"
    COMPLETED = "COMPLETED", "Đã trả phòng"
    CANCELLED = "CANCELLED", "Đã hủy"
    CANCELLED_FAILED = "CANCELLED_FAILED", "Hủy phòng thất bại"

class TrangThaiThanhToan(models.TextChoices):
    PENDING   = "PENDING_PAYMENT",  "Chờ thanh toán"
    PAID      = "PAID",      "Đã thanh toán"
    REFUND_PENDING = "REFUND_PENDING", "Chờ hoàn tiền"
    REFUND_PROCESSING = "REFUND_PROCESSING", "Chờ thanh toán"
    REFUNDED = "REFUNDED", "Đã hoàn tiền"
    REFUND_FAILED = "FAILED_REFUND", "Hoàn tiền thất bại"
    FAILED = "FAILED", "Thanh toán thất bại"

class PhuongThucThanhToan(models.TextChoices):
    CASH        = "CASH",        "Tiền mặt"
    CREDIT_CARD = "CREDIT_CARD", "Thẻ tín dụng"
    MOMO        = "MOMO",        "MoMo"
    ZALOPAY     = "ZALOPAY",     "ZaloPay"