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
    def get_trans_id(id_booking):
        vietnam_now = datetime.now(timezone.utc) + timedelta(hours=7)
        trans_id_date = vietnam_now.strftime("%y%m%d")
        
        return f"{trans_id_date}_#{str(id_booking)[:8].upper()}"
    
    @staticmethod
    def _build_embed_data(user: NguoiDung, id_booking: uuid.UUID, id_invoice: int):
        embed_data = {
            "user_email": user.email,
            "redirecturl": f'http://localhost:5173/payment/confirmation.html?id_booking={id_booking}',
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
    def _generate_create_order_mac(
        app_trans_id, app_user, amount, app_time, embed_data, item
    ):
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
    def _send_create_order_request(zalo_order_payload):
        return requests.post(
            settings.ZALOPAY_CREATE_ORDER_URL, json=zalo_order_payload, timeout=15
        )
        
    @staticmethod
    def _get_create_order_result(zalo_create_order_response: requests.Response, app_trans_id) -> dict:
        order_result = zalo_create_order_response.json()
        
        return {
            "return_code": order_result["return_code"],
            "return_message": order_result["return_message"],
            "sub_return_code": order_result["sub_return_code"],
            "sub_return_message": order_result["sub_return_message"],
            "order_url": order_result["order_url"],
            "id_transaction": app_trans_id
        }
        
    @classmethod
    def create_order(cls, booking: DatPhong, invoice: HoaDon, user: NguoiDung):
        app_user = user.email
        app_time = int(time.time() * 1000)
        app_trans_id = cls.get_trans_id(booking.id_booking)
        amount = int(invoice.total_amount)
        embed_data = cls._build_embed_data(user, booking.id_booking, invoice.id_invoice)
        item = cls._build_item(booking)
        mac = cls._generate_create_order_mac(
            app_trans_id, app_user, amount, app_time, embed_data, item
        )

        zalo_order_payload = {
            "app_id": settings.ZALOPAY_APP_ID,
            "app_user": user.email,
            "app_time": app_time,
            "app_trans_id": app_trans_id,
            "amount": amount,
            "embed_data": embed_data,
            "item": item,
            "description": f"ZaloPay - Thanh toán cho đơn hàng {app_trans_id}",
            "mac": mac,
            "expire_duration_seconds": 900,
        }
        
        zalo_create_order_response = cls._send_create_order_request(zalo_order_payload)

        return cls._get_create_order_result(zalo_create_order_response, app_trans_id)

    @staticmethod
    def _generate_get_order_status_mac(app_id, app_trans_id, secret_key):
        return hmac.new(
            str(secret_key).encode("utf-8"),
            f"{app_id}|{app_trans_id}|{secret_key}".encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

    @staticmethod
    def _send_get_order_status_request(app_id, app_trans_id, mac):
        return requests.post(
            settings.ZALOPAY_GET_ORDER_STATUS_URL,
            json={"app_id": app_id, "app_trans_id": app_trans_id, "mac": mac},
        )
        
    def _get_order_status_result(zalo_order_status_response: requests.Response) -> dict:
        return zalo_order_status_response.json()

    @classmethod
    def get_order_status(cls, app_trans_id) -> requests.Response:
        secret_key = settings.ZALOPAY_SECRET_KEY
        app_id = settings.ZALOPAY_APP_ID
        mac = cls._generate_get_order_status_mac(app_id, app_trans_id, secret_key)

        zalo_order_status_response = cls._send_get_order_status_request(app_id, app_trans_id, mac)
        
        return cls._get_order_status_result(zalo_order_status_response)
