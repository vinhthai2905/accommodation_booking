from django.contrib import admin

# Register your models here.

from .models import KhachSan, LoaiKhachSan

admin.site.register(KhachSan)
admin.site.register(LoaiKhachSan)