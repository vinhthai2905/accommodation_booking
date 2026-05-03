from django.contrib import admin

from .models import DatPhong, ChiTietDatPhong, ChiTietKhachTreEm, HoaDon

# Register your models here.

admin.site.register(DatPhong)
admin.site.register(ChiTietDatPhong)
admin.site.register(ChiTietKhachTreEm)
admin.site.register(HoaDon)
