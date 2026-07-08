from django.conf import settings

import time
import hmac
import hashlib

class ZaloPayBaseService:
    secret_key = settings.ZALOPAY_SECRET_KEY
    app_id = settings.ZALOPAY_APP_ID
    
    @staticmethod
    def _hash_mac(payload: str, key: str) -> str:
        return hmac.new(
            key.encode("utf-8"),
            payload.encode("utf-8"),
            hashlib.sha256
        ).hexdigest()
        
    
        
        
