from django.contrib.auth.models import AbstractUser, UserManager, BaseUserManager
from django.db import models
from django.utils import timezone

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
        primary_key=True, default=uuid.uuid4, unique=True, editable=False, db_column="id_nguoi_dung"
    )

    email = models.EmailField(
        "email",
        unique=True,
        error_messages={
            "unique": "Email này đã tồn tại.",
        },
    )

    email_verified_at = models.DateTimeField(
        verbose_name = "Lần xác nhận email",
        null=True,
        db_column="lan_xac_nhan_email"
    )
    
    google_id = models.CharField(
        max_length=50,
        null=True,
    ),
    
    password = models.CharField(
        verbose_name="Mật khẩu",
        max_length=128,
        db_column="mat_khau",
    )

    auth_type = models.CharField(
        max_length=10,
        null=True
    )
    
    is_staff = models.BooleanField(
        verbose_name="Nhân viên",
        default=False,
        db_column="nhan_vien",
        help_text="Quy định người dùng có thể đăng nhập vào trang quản trị hay không.",
    )

    is_active = models.BooleanField(
        verbose_name="Đang hoạt động",
        default=True,
        db_column="dang_hoat_dong",
        help_text="Bỏ chọn thay vì xóa tài khoản.",
    )

    is_superuser = models.BooleanField(
        verbose_name="Quản trị viên",
        default=False,
        db_column="quan_tri_vien",
        help_text="Có toàn bộ quyền mà không cần gán cụ thể.",
    )

    last_login = models.DateTimeField(
        verbose_name="Lần đăng nhập cuối",
        null=True,
        db_column="lan_dang_nhap_cuoi",
    )

    last_updated = models.DateTimeField(
        verbose_name="Lần cập nhật cuối",
        null=True,
        auto_now=True,
        db_column="lan_cap_nhat_cuoi"
    )
    
    date_joined = models.DateTimeField(
        verbose_name="Ngày tham gia",
        auto_now_add=True,
        db_column="ngay_tham_gia",
    )

    groups = models.ManyToManyField(
        "auth.Group",
        verbose_name="Nhóm quyền",
        related_name="nguoi_dung_set",
        related_query_name="nguoi_dung",
        help_text="Các nhóm mà người dùng này thuộc về.",
    )

    user_permissions = models.ManyToManyField(
        "auth.Permission",
        verbose_name="Quyền riêng",
        related_name="nguoi_dung_set",
        related_query_name="nguoi_dung",
        help_text="Các quyền được gán trực tiếp cho người dùng này.",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = NguoiDungManager()

    class Meta:
        db_table = "nguoi_dung"

    def __str__(self):
        return self.email

    def get_full_name(self):
        full_name = f"{self.last_name} {self.first_name}".strip()
        return full_name or self.email

    def get_short_name(self):
        return self.first_name or self.email


class ThongTinNguoiDung(models.Model):
    id_user = models.OneToOneField(
        NguoiDung, on_delete=models.CASCADE, db_column="id_nguoi_dung", primary_key=True
    )

    first_name = models.CharField(
        verbose_name="Tên",
        max_length=150,
        db_column="ten",
        null=True,
    )

    last_name = models.CharField(
        verbose_name="Họ",
        max_length=150,
        db_column="ho",
        null=True
    )
    
    country = models.CharField(
        verbose_name="Quốc gia",
        max_length=50,
        db_column="quoc_gia",
        null=True
    )
    
    phone_number = models.CharField(
        verbose_name="Số điện thoại",
        max_length=15,
        db_column="so_dien_thoai",
        null=True,
    ),
    
    role = models.CharField(
        verbose_name="Vai trò",
        max_length=10,
        db_column="vai_tro",
        choices=RoleChoice,
        null=True
    )
    
    class Meta:
        db_table = "thongtin_nguoidung"
