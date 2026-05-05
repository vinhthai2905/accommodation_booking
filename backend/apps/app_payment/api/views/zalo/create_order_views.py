import hmac
import hashlib

from rest_framework import views
from rest_framework.request import Request
from rest_framework.response import Response

class TestMacCreateOrder(views.APIView):
    def get(self, request: Request, *args, **kwargs):
        mac = hmac.new(
            "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn".encode("utf-8"),
            "2554|260505_1777978245383|ZaloPayDemo|10000|1777978245383|{}|[]".encode("utf-8"),
            hashlib.sha256            
        ).hexdigest()
        
        
        return Response({
            "mac": mac
        })
        
class CreateZaloOrder(views.APIView):
    pass
        
class TestMacCancelOrder(views.APIView):
    def get(self, request: Request, *args, **kwargs):
        key1 = "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn"

        app_id = 2554
        app_trans_id = "260505_17779782453834"

        mac = hmac.new(
            key1.encode("utf-8"),
            f"{app_id}|{app_trans_id}|{key1}".encode("utf-8"),
            hashlib.sha256
        ).hexdigest()

        return Response({
            "app_id": app_id,
            "app_trans_id": app_trans_id,
            "mac": mac
        })
        

        
class TestMacBankList(views.APIView):
    def get(self, request: Request, *args, **kwargs):
        key1 = "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn"

        appid = "2554"
        reqtime = "1777971552286"

        hmac_input = f"{appid}|{reqtime}"

        mac = hmac.new(
            key1.encode("utf-8"),
            hmac_input.encode("utf-8"),
            hashlib.sha256
        ).hexdigest()

        return Response({
            "appid": appid,
            "reqtime": reqtime,
            "hmac_input": hmac_input,
            "mac": mac
        })