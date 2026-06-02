from rest_framework import exceptions

from apps.app_booking.models import DatPhong
from apps.app_user.models import NguoiDung

def get_booking(id_booking, user: NguoiDung) -> DatPhong:
    try:
        booking = DatPhong.objects.select_related("invoice__payments").get(
            id_booking=id_booking,
            id_user=user
        )
    except Exception as e:
        raise exceptions.NotFound(
            detail={"error": "Booking wasn't found with the given ID."}
        )
    return booking
