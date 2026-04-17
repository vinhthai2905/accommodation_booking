from django.db import models

from apps.app_user import models as table

class VaiTro(models.Model):
    id_role = models.AutoField(
        primary_key=True,
        db_column="id_vai_tro",
    )

    role_name = models.CharField(
        max_length=15,
        unique=True,
        db_column="ten_vai_tro",
    )

    class Meta:
        db_table = "vai_tro"

    def __str__(self):
        return self.role_name


class VaiTroNguoiDung(models.Model):
    id_user_role = models.AutoField(
        primary_key=True,
        db_column="id_vai_tro_nguoi_dung",
    )

    id_role = models.ForeignKey(
        VaiTro,
        on_delete=models.CASCADE,
        db_column="id_vai_tro",
        related_name="role_user_set",
    )

    id_user = models.ForeignKey(
        table.NguoiDung,
        on_delete=models.CASCADE,
        db_column="id_nguoi_dung",
        related_name="role_set",
    )

    class Meta:
        db_table = "vai_tro_nguoi_dung"
        constraints = [
            models.UniqueConstraint(
                fields=["id_role", "id_user"],
                name="unique_vai_tro_nguoi_dung",
            )
        ]

    def __str__(self):
        return f"{self.id_user.email} - {self.id_role.role_name}"