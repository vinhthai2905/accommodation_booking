from rest_framework import exceptions

from apps.app_hotel.models import KhachSan

def get_hotel(id_hotel):
    try:
        hotel = KhachSan.objects.get(id_hotel=id_hotel)
    except:
        raise exceptions.NotFound("Hotel not found by the given ID.")

    return hotel
