import os
import mimetypes
from django.http import HttpResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.app_hotel.models import DonDangKyKhachSan, TaiLieuDangKy
from apps.app_admin.permissions.admin_permissions import IsAdminUser
from helpers.encryption_utils import decrypt_document


class AdminRegistrationDocumentDownloadView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def _get_document_record(self, id_registration):
        """Fetches the document record associated with the registration ID."""
        try:
            registration = DonDangKyKhachSan.objects.get(id_registration=id_registration)
            return TaiLieuDangKy.objects.get(id_registration=registration)
        except (DonDangKyKhachSan.DoesNotExist, TaiLieuDangKy.DoesNotExist):
            return None

    def _get_file_path(self, document_url):
        """Extracts the relative path from the URL and builds the absolute file path."""
        media_url_prefix = settings.MEDIA_URL
        if document_url.startswith(media_url_prefix):
            relative_path = document_url[len(media_url_prefix):]
        elif document_url.startswith(f"http://localhost:8000{media_url_prefix}"):
            relative_path = document_url[len(f"http://localhost:8000{media_url_prefix}"):]
        else:
            relative_path = document_url.split('/media/')[-1]
            
        return os.path.join(settings.MEDIA_ROOT, relative_path)

    def _read_and_decrypt_file(self, file_path):
        """Reads the file and decrypts it if it's an encrypted file. Returns the bytes."""
        with open(file_path, 'rb') as f:
            file_bytes = f.read()

        if file_path.endswith('.enc'):
            return decrypt_document(file_bytes)
        return file_bytes

    def _build_file_response(self, file_path, document_name):
        """Builds an HttpResponse for the file after reading and decrypting."""
        if not os.path.exists(file_path):
            return Response(
                {"error": "Tệp tin không tồn tại trên hệ thống."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            decrypted_bytes = self._read_and_decrypt_file(file_path)

            original_filename = os.path.basename(file_path).replace('.enc', '')
            content_type, _ = mimetypes.guess_type(original_filename)
            
            if not content_type:
                content_type = 'application/octet-stream'

            response = HttpResponse(decrypted_bytes, content_type=content_type)
            response['Content-Disposition'] = f'inline; filename="{document_name or original_filename}"'
            return response
            
        except Exception as e:
            # Catch decryption errors or read errors
            error_msg = str(e) if "Giải mã" in str(e) else f"Lỗi máy chủ khi đọc tệp: {str(e)}"
            return Response(
                {"error": error_msg},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request, id_registration):
        document = self._get_document_record(id_registration)
        if not document:
            return Response(
                {"error": "Không tìm thấy tài liệu đăng ký."},
                status=status.HTTP_404_NOT_FOUND
            )

        if not document.url:
            return Response(
                {"error": "Đơn đăng ký không có tệp đính kèm."},
                status=status.HTTP_404_NOT_FOUND
            )

        file_path = self._get_file_path(document.url)
        return self._build_file_response(file_path, document.document_name)
