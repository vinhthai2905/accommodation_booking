from django.db import models


class Phuong(models.Model):
    id_phuong = models.AutoField(
        primary_key=True,
        db_column="id_phuong"
    )

    ten_phuong = models.CharField(
        max_length=15,
        db_column="ten_phuong"
    )

    slug = models.SlugField(
        max_length=50,
        unique=True,
        db_column="slug"
    )

    class Meta:
        db_table = "phuong"

    def __str__(self):
        return self.ten_phuong