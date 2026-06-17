from django.conf import settings
from urllib.parse import urlencode

def create_verification_url(uidb64, token):
    query = urlencode({
        "token": token,
        "uid": uidb64
    })
    
    return f"{settings.FRONT_END_URL}/verify-email?{query}"
