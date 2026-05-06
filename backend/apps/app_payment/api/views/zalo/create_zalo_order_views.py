import hmac
import hashlib

from datetime import datetime, timedelta, timezone

import time

from rest_framework import views
from rest_framework.request import Request
from rest_framework.response import Response

from apps.app_payment.api.serializers.zalo import CreateZaloOrderSerializer


class CreateZaloOrder(views.APIView):
    serializer_class = CreateZaloOrderSerializer
    
    def post(self, request: Request, *args, **kwargs):
        return Response({"data: zalo order created sucessfully."})
    
    

class TestMacCreateOrder(views.APIView):
    def get(self, request: Request, *args, **kwargs):
        mac = hmac.new(
            "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn".encode("utf-8"),
            "2554|260505_1777984487000|ZaloPayDemo|10000|1777984487000|{}|[]".encode("utf-8"),
            hashlib.sha256            
        ).hexdigest()
        
        
        return Response({
            "mac": mac
        })
        
        
class TestMacCancelOrder(views.APIView):
    def get(self, request: Request, *args, **kwargs):
        key1 = "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn"

        app_id = 2554
        app_trans_id = "260506_#2AD973A5"

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