from django.contrib.auth.models import AbstractUser, UserManager, BaseUserManager
from django.db import models

from apps.app_nguoidung.choices import RoleChoice

import uuid

class NguoiDungManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email bắt buộc phải có.")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_active", True)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser phải có is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser phải có is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class NguoiDung(AbstractUser):
    username = None
    first_name = None
    last_name = None

    id_user = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False, db_column="id_nguoi_dung"
    )

    id_google = models.CharField(
        max_length=50, 
        null=True, 
        db_column="id_google"
    )

    email = models.EmailField(unique=True, db_column="email")

    lan_xac_nhan_email = models.DateTimeField(
        null=True, db_column="lan_xac_nhan_email", blank=True
    )

    loai_xac_thuc = models.CharField(
        max_length=20, null=True, db_column="loai_xac_thuc"
    )
    
    is_superuser = models.BooleanField(default=False, db_column="la_superuser")

    is_staff = models.BooleanField(default=False, db_column="la_nhan_vien_he_thong")

    vai_tro = models.CharField(
        max_length=20,
        null=True,
        choices=RoleChoice,
        db_column="vai_tro",
    )

    is_active = models.BooleanField(default=True, db_column="dang_hoat_dong")

    updated_at = models.DateTimeField(
        auto_now=True, db_column="lan_cap_nhat_cuoi", blank=True
    )

    last_login = models.DateTimeField(
        null=True, db_column="lan_dang_nhap_cuoi", blank=True
    )

    date_joined = models.DateTimeField(
        auto_now_add=True, db_column="ngay_tham_gia", blank=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = NguoiDungManager()

    class Meta:
        db_table = "nguoi_dung"
        verbose_name = "Người dùng"


class ThongTinNguoiDung(models.Model):
    id_user = models.OneToOneField(
        NguoiDung, on_delete=models.CASCADE, primary_key=True, db_column="id_nguoi_dung"
    )

    ho = models.CharField(
        max_length=10,
        db_column="ho",
        null=True,
    )

    ten = models.CharField(
        max_length=15,
        db_column="ten",
        null=True,
    )

    quoc_gia = models.CharField(
        max_length=20,
        db_column="quoc_gia",
        null=True,
    )

    so_dien_thoai = models.CharField(
        max_length=25,
        db_column="so_dien_thoai",
        null=True,
    )

    gioi_tinh = models.CharField(
        max_length=3,
        db_column="gioi_tinh",
        null=True,
    )

    class Meta:
        db_table = "thongtin_nguoidung"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(gioi_tinh__in=["Nam", "Nữ"]) | models.Q(gioi_tinh__isnull=True), 
                name="gioi_tinh_hop_le"
            )
        ]
