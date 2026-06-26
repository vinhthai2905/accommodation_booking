from django.conf import settings
from cryptography.fernet import Fernet
import logging

logger = logging.getLogger(__name__)

def _get_encryption_key():
    """Retrieves and safely parses the encryption key from settings."""
    key = getattr(settings, 'DOCUMENT_ENCRYPTION_KEY', None)
    if not key:
        return None
        
    if isinstance(key, str):
        key = key.strip()
        if key.startswith("b'") and key.endswith("'"):
            key = key[2:-1]
        elif key.startswith('b"') and key.endswith('"'):
            key = key[2:-1]
        return key.encode('utf-8')
    return key

def encrypt_document(file_bytes):
    """
    Encrypts a file's bytes using the configured DOCUMENT_ENCRYPTION_KEY.
    Returns the original bytes if no key is configured.
    """
    key = _get_encryption_key()
    if key:
        try:
            fernet = Fernet(key)
            return fernet.encrypt(file_bytes)
        except Exception as e:
            logger.error(f"Encryption failed: {str(e)}")
            raise Exception("Mã hóa tệp tin thất bại.")
    return file_bytes

def decrypt_document(file_bytes):
    """
    Decrypts a file's bytes using the configured DOCUMENT_ENCRYPTION_KEY.
    Returns the original bytes if no key is configured.
    """
    key = _get_encryption_key()
    if key:
        try:
            fernet = Fernet(key)
            return fernet.decrypt(file_bytes)
        except Exception as e:
            logger.error(f"Decryption failed: {str(e)}")
            raise Exception("Giải mã tệp tin thất bại. File có thể bị lỗi hoặc sai key.")
    return file_bytes
