from django.conf import settings

from datetime import datetime, timedelta, timezone

import requests
import time
import uuid
import json
import hashlib
import hmac

from apps.app_booking.models import DatPhong, HoaDon
from apps.app_user.models import NguoiDung

from .zalo_pay_services import ZaloPayBaseService

class ZaloPayCreateOrderService(ZaloPayBaseService):
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

    @classmethod
    def _generate_create_order_mac(
        cls,
        mac_payload,
        secret_key
    ):
        encrypting_payload = (
            f"{cls.app_id}|"
            f"{mac_payload["app_trans_id"]}|"
            f"{mac_payload["app_user"]}|"
            f"{mac_payload["amount"]}|"
            f"{mac_payload["app_time"]}|"
            f"{mac_payload["embed_data"]}|"
            f"{mac_payload["item"]}"
        )
        return cls._hash_mac(encrypting_payload, secret_key)
        
    @classmethod
    def _get_mac_payload(cls, booking, user, invoice):
        mac_payload = {}
        
        mac_payload["app_trans_id"] = cls.get_trans_id(booking.id_booking)
        mac_payload["app_user"] = user.email
        mac_payload["amount"] = int(invoice.total_amount)
        mac_payload["app_time"] = int(time.time() * 1000)
        mac_payload["embed_data"] = cls._build_embed_data(user, booking.id_booking, invoice.id_invoice)
        mac_payload["item"] = cls._build_item(booking)
        
        return mac_payload    

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
        secret_key = cls.secret_key
        mac_payload = cls._get_mac_payload(booking, user, invoice)
        mac = cls._generate_create_order_mac(
            mac_payload, secret_key
        )

        zalo_order_payload = {
            "app_id": cls.app_id,
            "app_user": mac_payload["app_user"],
            "app_time": mac_payload["app_time"],
            "app_trans_id": mac_payload["app_trans_id"],
            "amount": mac_payload["amount"],
            "embed_data": mac_payload["embed_data"],
            "item": mac_payload["item"],
            "description": f"ZaloPay - Thanh toán cho đơn hàng {mac_payload["app_trans_id"]}",
            "mac": mac,
            "expire_duration_seconds": 900,
        }
        
        zalo_create_order_response = cls._send_create_order_request(zalo_order_payload)

        return cls._get_create_order_result(zalo_create_order_response, mac_payload["app_trans_id"])
    
class ZaloPayGetOrderStatusService(ZaloPayBaseService):
    def _get_mac_payload(app_id, app_trans_id):
        mac_payload = {}
        
        mac_payload["app_id"] = app_id
        mac_payload["app_trans_id"] = app_trans_id
        
        return mac_payload
    
    @classmethod
    def _generate_get_order_status_mac(
        cls,
        mac_payload,
        secret_key,
    ):
        encrypting_payload = (
            f"{mac_payload['app_id']}|"
            f"{mac_payload['app_trans_id']}|"
            f"{secret_key}"
        )
    
        return cls._hash_mac(
            encrypting_payload,
            secret_key,
        )

    @staticmethod
    def _send_get_order_status_request(app_id, app_trans_id, mac):
        return requests.post(
            settings.ZALOPAY_GET_ORDER_STATUS_URL,
            json={"app_id": app_id, "app_trans_id": app_trans_id, "mac": mac},
        )
    
    @staticmethod
    def _get_order_status_result(zalo_order_status_response: requests.Response) -> dict:
        return zalo_order_status_response.json()

    @classmethod
    def get_order_status(cls, app_trans_id) -> dict:
        mac_payload = cls._get_mac_payload(cls.app_id, app_trans_id)
        mac = cls._generate_get_order_status_mac(mac_payload, cls.secret_key)

        zalo_order_status_response = cls._send_get_order_status_request(cls.app_id, app_trans_id, mac)
        
        return cls._get_order_status_result(zalo_order_status_response)
    
class ZaloPayRefundService(ZaloPayGetOrderStatusService):
    @classmethod
    def _get_zp_trans_id(cls, app_trans_id):
        order_status = cls.get_order_status(app_trans_id)
        if order_status.get("return_code") != 1:
            return {
                "return_code": order_status.get("return_code", -1),
                "return_message": order_status.get("return_message", "Failed to fetch order status"),
                "sub_return_message": "Cannot fetch zp_trans_id"
            }
            
        zp_trans_id = str(order_status.get("zp_trans_id"))
        
        return zp_trans_id
    
    @classmethod
    def _generate_merchant_refund_id(cls):
        vietnam_now = datetime.now(timezone.utc) + timedelta(hours=7)
        trans_id_date = vietnam_now.strftime("%y%m%d")
        unique_id = str(uuid.uuid4())[:8].upper()
        return f"{trans_id_date}_{cls.app_id}_{unique_id}"

    @classmethod
    def _generate_refund_mac(cls, mac_payload, secret_key):
        encrypting_payload = (
            f"{mac_payload['app_id']}|"
            f"{mac_payload['zp_trans_id']}|"
            f"{mac_payload['amount']}|"
            f"{mac_payload['description']}|"
            f"{mac_payload['timestamp']}"
        )
        return cls._hash_mac(encrypting_payload, secret_key)

    @staticmethod
    def _send_refund_request(refund_payload):
        return requests.post(
            settings.ZALOPAY_CANCEL_ORDER_URL, json=refund_payload, timeout=15
        )

    @classmethod
    def refund(cls, app_trans_id: str, amount: int, description: str = "") -> dict:
        zp_trans_id = cls._get_zp_trans_id(app_trans_id)
        
        mac_payload = {
            "app_id": cls.app_id,
            "zp_trans_id": zp_trans_id,
            "amount": amount,
            "description": description,
            "timestamp": cls.timestamp
        }
        
        mac = cls._generate_refund_mac(mac_payload, cls.secret_key)
        
        refund_payload = {
            "app_id": cls.app_id,
            "m_refund_id": cls._generate_merchant_refund_id(),
            "timestamp": cls.timestamp,
            "zp_trans_id": zp_trans_id,
            "amount": amount,
            "description": description,
            "mac": mac
        }
        
        response = cls._send_refund_request(refund_payload)
        
        return response.json()