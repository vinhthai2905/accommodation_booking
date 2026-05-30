from django.template.loader import render_to_string
from apps.app_user.models import NguoiDung

def render_verification_email_message(user: NguoiDung, verification_url = None):
    return render_to_string(
        "verification_email.html",
        {
            "user": user,
            # "verification_url": verification_url
        }
    )