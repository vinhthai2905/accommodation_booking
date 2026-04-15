from django.contrib import admin

from .models import NguoiDung, ThongTinNguoiDung, VaiTro, VaiTroNguoiDung

# Register your models here.

admin.site.register(NguoiDung)
admin.site.register(ThongTinNguoiDung)
admin.site.register(VaiTro)
admin.site.register(VaiTroNguoiDung)
