from django.contrib.gis.db import models

class Bien(models.Model):
    name = models.CharField(max_length=255, db_column="ten_vi_tri_bien")
    beach_location = models.PointField(srid=4326, db_column="toa_do_bien")
    
    class Meta:
        db_table="khu_vuc_bien"
        verbose_name_plural="Khu vực biển"
    
    def ___str___(self):
        return self.name