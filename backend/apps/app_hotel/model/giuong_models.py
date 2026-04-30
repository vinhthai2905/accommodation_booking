from django.db import models

class Giuong(models.Model):
    id = models.AutoField(
        primary_key=True,
        db_column="id_giuong",
    )

    name = models.CharField(
        max_length=30,
        db_column="ten_giuong",
    )
    
    max_capacity = models.PositiveSmallIntegerField(
        null=True,
        db_column="toi_da_khach"
    )
    
    size = models.CharField(
        null=True,
        max_length=20,
        db_column="kich_thuoc"
    )

    class Meta:
        db_table = "giuong"
        verbose_name_plural = "Giường"

    def __str__(self):
        return self.name