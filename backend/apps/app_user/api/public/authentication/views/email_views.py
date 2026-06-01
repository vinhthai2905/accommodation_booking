from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.permissions import AllowAny

from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils import timezone

from apps.common.permission import IsCustomer, IsAuthenticatedUserActive
from apps.app_user.models import NguoiDung

from apps.app_user.helpers import (
    render_verification_email_message,
    create_verification_url,
    refresh_verification_email_expiry,
)
from apps.app_user.api.public.authentication.serializers import (
    SendVerificationEmailSerializer,
    VerifyUserEmailSerializer,
)

class SendVerificationEmailView(APIView):
    permission_classes = [IsCustomer, IsAuthenticatedUserActive]
    serializer_class = SendVerificationEmailSerializer

    def _create_verification_token(self, user: NguoiDung):
        uidb64 = urlsafe_base64_encode(force_bytes(user.id_user))
        token = default_token_generator.make_token(user)

        return uidb64, token

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
                detail={
                    "Timeout Error": "Please wait before requesting another verification email."
                }
            )

    def post(self, request: Request, *args, **kwargs):
        uidb64, verification_token = self._create_verification_token(request.user)
        verification_url = create_verification_url(uidb64, verification_token)
        message = render_verification_email_message(request.user, verification_url)

        try:
            self._validate_user_verification(request.user)
            send_mail(
                subject="Xác minh email của bạn",
                message=message,
                from_email=None,
                recipient_list=[request.user.email],
                fail_silently=False,
                html_message=message,
            )
            refresh_verification_email_expiry(request.user)
        except Exception as e:
            raise e

        return Response(
            {"detail": "Account verification email sent successfully."},
            status=status.HTTP_200_OK,
        )


class VerifyUserEmailView(APIView):
    permission_classes = [AllowAny]
    serializer_class = VerifyUserEmailSerializer

    def _get_user_from_uidb64(self, uidb64: str) -> NguoiDung:
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            return NguoiDung.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, NguoiDung.DoesNotExist):
            raise exceptions.ValidationError(
                detail={"detail": "Invalid or expired verification link."}
            )

    def _validate_token(self, user: NguoiDung, token: str):
        if not default_token_generator.check_token(user, token):
            raise exceptions.ValidationError(
                detail={"detail": "Invalid or expired verification link."}
            )
            
        if user.verified_at:
            raise exceptions.ValidationError(
                detail={"detail": "Email is already verified."}
            )

    def _verify_user(self, user: NguoiDung):
        user.verified_at = timezone.now()
        user.verification_token = None
        user.verification_expires_at = None
        user.save()

    def post(self, request: Request, uidb64, token, *args, **kwargs):
        user = self._get_user_from_uidb64(uidb64)
        self._validate_token(user, token)
        self._verify_user(user)
        
        return Response(
            {"detail": "Email verified successfully."},
            status=status.HTTP_200_OK,
        )
