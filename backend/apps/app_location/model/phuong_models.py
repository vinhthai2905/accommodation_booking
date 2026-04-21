from django.db import models

from .thanh_pho_models import ThanhPho

class Phuong(models.Model):
    id_ward = models.AutoField(
        primary_key=True,
        editable=False,    
        db_column="id_phuong"
    )
    
    id_city = models.ForeignKey(
        ThanhPho,
        on_delete=models.CASCADE,
        db_column="id_thanh_pho",
        related_name="wards",
        null=True
    )

    ward_name = models.CharField(
        max_length=15,
        db_column="ten_phuong"
    )

    slug = models.SlugField(
        max_length=100,
        unique=True,
        db_column="slug"
    )

    class Meta:
        db_table = "phuong"
        verbose_name = "Phường"

    def __str__(self):
        return self.ward_name