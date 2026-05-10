from django.contrib import admin

from .models import DatPhong, ChiTietDatPhong, ChiTietKhachTreEm, HoaDon, ThanhToan

# Register your models here.

@admin.register(DatPhong)
class DatPhongAdmin(admin.ModelAdmin):
    readonly_fields = ("id_booking", "id_user", "id_hotel", "created_at", "updated_at")

    list_display = (
        "id_booking",
        "id_user",
        "id_hotel",
        "check_in_date",
        "check_out_date",
        "created_at"
    )
    

@admin.register(ChiTietDatPhong)
class ChiTietDatPhongAdmin(admin.ModelAdmin):
    readonly_fields = ("id_booking_detail", "id_booking", "id_room")
    
    list_display = (
        "id_booking_detail",
        "id_booking",
        "id_room",
        "check_in_date",
        "check_out_date",
    )
    
    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related(
                "id_booking",
                "id_booking__id_hotel",
                "id_room",
            )
        )

    @admin.display(description="Check-in", ordering="id_booking__check_in_date")
    def check_in_date(self, obj):
        return obj.id_booking.check_in_date

    @admin.display(description="Check-out", ordering="id_booking__check_out_date")
    def check_out_date(self, obj):
        return obj.id_booking.check_out_date

admin.site.register(ChiTietKhachTreEm)
admin.site.register(HoaDon)
admin.site.register(ThanhToan)


