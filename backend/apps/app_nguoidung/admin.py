from django.contrib import admin

from .models import NguoiDung
from .models import ThongTinNguoiDung

# Register your models here.

admin.site.register(NguoiDung)
admin.site.register(ThongTinNguoiDung)
