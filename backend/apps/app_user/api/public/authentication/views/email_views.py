from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, exceptions

from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils import timezone

from apps.common.permission import IsCustomer, IsAuthenticatedUserActive
from apps.app_user.models import NguoiDung

from apps.app_user.helpers import (
    render_verification_email_message, refresh_verification_email_expiry
)
from apps.app_user.api.public.authentication.serializers import SendVerificationEmailSerializer


class SendVerificationEmailView(APIView):
    permission_classes = [IsCustomer, IsAuthenticatedUserActive]
    serializer_class = SendVerificationEmailSerializer
    
    def _validate_user_verification(self, user: NguoiDung):
        if user.verified_at is not None:
            raise exceptions.ValidationError(
                detail={"Email": "Email has already been verified."}
            )
            
        if (
            user.verification_expires_at is not None
            and user.verification_expires_at > timezone.now()
        ):
            raise exceptions.ValidationError(
                detail={"Timeout Error": "Please wait before requesting another verification email."}
            )
        

    def post(self, request: Request, *args, **kwargs):
        message = render_verification_email_message(request.user)
        
        try:
            self._validate_user_verification(request.user)
            send_mail(
                subject="Xác minh email của bạn",
                message=message,
                from_email=None,
                recipient_list=[request.user.email],
                fail_silently=False,
                html_message=message
            )
            refresh_verification_email_expiry(request.user)
        except Exception as e:
            raise e

        return Response(
            {"detail": "Account verification email sent successfully."},
            status=status.HTTP_200_OK,
        )
