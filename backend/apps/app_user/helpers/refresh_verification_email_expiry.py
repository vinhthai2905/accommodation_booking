from django.utils import timezone
from datetime import timedelta

from apps.app_user.models import NguoiDung

def refresh_verification_email_expiry(user: NguoiDung):
    user.verification_expires_at = timezone.now() + timedelta(minutes=15)
    user.save(update_fields=["verification_expires_at"])
    
