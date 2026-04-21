from django.contrib import admin

# Register your models here.

from .models import Phuong, ThanhPho

admin.site.register(Phuong)
admin.site.register(ThanhPho)