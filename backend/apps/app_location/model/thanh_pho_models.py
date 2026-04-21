from django.db import models

class ThanhPho(models.Model):
    id_city = models.AutoField(
        primary_key=True,
        db_column="id_thanh_pho",
    )

    city_name = models.CharField(
        max_length=100,
        unique=True,
        db_column="ten_thanh_pho",
    )
    
    slug = models.SlugField(
        max_length=100,
        unique=True,
        db_column="slug"
    )

    class Meta:
        db_table = "thanh_pho"

    def __str__(self):
        return self.city_name