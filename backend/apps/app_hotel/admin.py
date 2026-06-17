from django.contrib import admin

# Register your models here.

from .models import *

@admin.register(KhachSan)
class KhachSanAdmin(admin.ModelAdmin):
    list_display = ("id_hotel", "name")


@admin.register(LoaiPhong)
class LoaiPhongAdmin(admin.ModelAdmin):
    list_display = ("id_room_type", "type_name", "id_hotel")


@admin.register(PhongKhachSan)
class PhongKhachSanAdmin(admin.ModelAdmin):
    list_display = ("id_room", "room_name", "id_room_type", "get_hotel")

    def get_hotel(self, obj):
        return obj.id_room_type.id_hotel

    get_hotel.short_description = "Hotel"

admin.site.register(LoaiKhachSan)
admin.site.register(ChinhSachTreEm)
admin.site.register(ChinhSachHoanTien)
admin.site.register(ChiTietLoaiPhong)
admin.site.register(Giuong)
admin.site.register(HinhAnhKhachSan)


admin.site.register(DanhGiaKhachSan)

admin.site.register(DanhMucTienNghi)
admin.site.register(LoaiTienNghi)
admin.site.register(TienNghiKhachSan)