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

    class Meta:
        db_table = "giuong"

    def __str__(self):
        return self.name