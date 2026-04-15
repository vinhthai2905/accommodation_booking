from django.contrib.auth.models import AbstractUser, UserManager, BaseUserManager
from django.db import models
from rest_framework.exceptions import ValidationError

from apps.app_nguoidung.choices import AuthTypeChoice
from apps.app_nguoidung import models as table

import uuid

class NguoiDungManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is required!")

        if not password:
            raise ValueError("Password is required!")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def _create_user_profile(self, user, first_name, last_name, phone_number):
        ThongTinNguoiDung(
            id_user=user,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
        ).save()
        
    def _create_user_role(self, user, role_name):
        role = table.VaiTro.objects.get(role_name=role_name)
        
        table.VaiTroNguoiDung(
            id_role=role,
            id_user=user
        ).save()
        
        print(role)

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_active", True)

        first_name = extra_fields.pop("first_name")
        last_name = extra_fields.pop("last_name")
        phone_number = extra_fields.pop("phone_number")
        role = extra_fields.pop("role_name")

        user = self._create_user(email, password, **extra_fields)
        self._create_user_profile(user, first_name, last_name, phone_number)
        self._create_user_role(user, role)

        return user

    def create_superuser(self, email, password, **extra_fields):
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
        primary_key=True, default=uuid.uuid4, editable=False, db_column="id_nguoi_dung"
    )

    id_google = models.CharField(
        max_length=50, null=True, blank=True, db_column="id_google"
    )

    email = models.EmailField(unique=True, db_column="email")

    lan_xac_nhan_email = models.DateTimeField(
        null=True,
        blank=True,
        db_column="lan_xac_nhan_email",
    )

    loai_xac_thuc = models.CharField(
        max_length=20,
        choices=AuthTypeChoice,
        default=AuthTypeChoice.EMAIL,
        db_column="loai_xac_thuc",
    )

    is_superuser = models.BooleanField(default=False, db_column="la_superuser")

    is_staff = models.BooleanField(default=False, db_column="la_nhan_vien_he_thong")

    is_active = models.BooleanField(default=True, db_column="dang_hoat_dong")

    updated_at = models.DateTimeField(
        auto_now=True,
        blank=True,
        db_column="lan_cap_nhat_cuoi",
    )

    last_login = models.DateTimeField(
        null=True,
        blank=True,
        db_column="lan_dang_nhap_cuoi",
    )

    date_joined = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        db_column="ngay_tham_gia",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = NguoiDungManager()

    class Meta:
        db_table = "nguoi_dung"
        verbose_name = "Người dùng"


class ThongTinNguoiDung(models.Model):
    id_user = models.OneToOneField(
        NguoiDung,
        on_delete=models.CASCADE,
        primary_key=True,
        db_column="id_nguoi_dung",
        related_name="personal_info",
    )

    first_name = models.CharField(
        max_length=10,
        db_column="ho",
        null=True,
    )

    last_name = models.CharField(
        max_length=15,
        db_column="ten",
        null=True,
    )

    country = models.CharField(
        max_length=20,
        db_column="quoc_gia",
        null=True,
    )

    phone_number = models.CharField(
        max_length=25,
        db_column="so_dien_thoai",
        null=True,
    )

    gender = models.CharField(
        max_length=3,
        db_column="gioi_tinh",
        null=True,
    )

    class Meta:
        db_table = "thong_tin_nguoi_dung"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(gender__in=["Nam", "Nữ"])
                | models.Q(gender__isnull=True),
                name="gioi_tinh_hop_le",
            )
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
