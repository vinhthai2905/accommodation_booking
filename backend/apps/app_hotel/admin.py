from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(KhachSan)
admin.site.register(LoaiKhachSan)
admin.site.register(ChinhSachTreEm)
admin.site.register(LoaiPhong)
admin.site.register(ChiTietLoaiPhong)
admin.site.register(Giuong)
admin.site.register(PhongKhachSan)
admin.site.register(HinhAnhKhachSan)