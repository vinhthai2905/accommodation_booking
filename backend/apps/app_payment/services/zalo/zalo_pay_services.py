from django.conf import settings

from datetime import datetime, timedelta, timezone

import requests
import time
import uuid
import json
import hashlib
import hmac

from helpers import get_email

from apps.app_booking.models import DatPhong, HoaDon
from apps.app_user.models import NguoiDung


class ZaloPayService:
    @staticmethod
    def _build_embed_data(user: NguoiDung, id_booking: uuid.UUID, id_invoice: int):
        embed_data = {
            "user_email": get_email(user),
            "id_booking": f"#{str(id_booking)[:8].upper()}",
            "id_invoice": f"#{id_invoice}",
        }

        return json.dumps(embed_data, separators=(",", ":"))

    @staticmethod
    def _build_item(booking: DatPhong):
        items = []
        all_booking_details = booking.booking_details.select_related("id_room").all()

        for detail in all_booking_details:
            items.append(
                {
                    "room_name": detail.id_room.room_name,
                }
            )

        return json.dumps(items, separators=("," ":"))

    @staticmethod
    def _generate_mac(app_trans_id, app_user, amount, app_time, embed_data, item):
        encrypted_data = (
            f"{settings.ZALOPAY_APP_ID}|"
            f"{app_trans_id}|"
            f"{app_user}|"
            f"{amount}|"
            f"{app_time}|"
            f"{embed_data}|"
            f"{item}"
        )
        return hmac.new(
            str(settings.ZALOPAY_SECRET_KEY).encode("utf-8"),
            encrypted_data.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

    @staticmethod
    def _create_zalo_pay_order(zalo_order_payload):
        return requests.post(
            settings.ZALOPAY_CREATE_ORDER_URL, json=zalo_order_payload, timeout=15
        )

    @classmethod
    def create_order(cls, booking: DatPhong, invoice: HoaDon, user: NguoiDung):
        vietnam_now = datetime.now(timezone.utc) + timedelta(hours=7)
        trans_id_date = vietnam_now.strftime("%y%m%d")

        app_user = user.email
        app_time = int(time.time() * 1000)
        app_trans_id = f"{trans_id_date}_#{str(booking.id_booking)[:8].upper()}"
        amount = invoice.total_amount
        embed_data = cls._build_embed_data(user, booking.id_booking, invoice.id_invoice)
        item = cls._build_item(booking)
        mac = cls._generate_mac(
            app_trans_id, app_user, amount, app_time, embed_data, item
        )

        zalo_order_payload = {
            "app_id": settings.ZALOPAY_APP_ID,
            "app_user": user.email,
            "app_time": app_time,
            "app_trans_id": app_trans_id,
            "amount": invoice.total_amount,
            "embed_data": embed_data,
            "item": item,
            "description": f"ZaloPay - Thanh toán cho đơn hàng {app_trans_id}",
            "mac": mac,
            "expire_duration_seconds": 900,
        }

        return cls._create_zalo_pay_order(zalo_order_payload)
