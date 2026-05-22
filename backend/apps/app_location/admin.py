from django.contrib import admin

# Register your models here.

from .models import Phuong, ThanhPho, Bien

admin.site.register(Phuong)
admin.site.register(ThanhPho)
admin.site.register(Bien)