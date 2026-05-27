from django.contrib.gis.db import models

class Bien(models.Model):
    name = models.CharField(max_length=255)
    beach_location = models.PointField(srid=4326)
    
    class Meta:
        db_table="khu_vuc_bien"
        verbose_name_plural="Khu vực biển"
    
    def ___str___(self):
        return self.name