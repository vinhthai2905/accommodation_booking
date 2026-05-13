from rest_framework import exceptions, views
from apps.app_hotel.models import KhachSan, LoaiPhong
from apps.app_user.models import NguoiDung

class PartnerHotelViewMixin:
    def get_partner_hotel(self, partner: NguoiDung):
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def get_room_type(self, hotel, id_room_type: int):
        try:
            return LoaiPhong.objects.get(
                id_room_type=id_room_type,
                id_hotel=hotel,
            )
        except LoaiPhong.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Room type not found or does not belong to your hotel."}
            )
            
    
    def get_partner_room_type(self, partner, id_room_type):
        hotel = self.get_partner_hotel(partner)
        
        return self.get_room_type(hotel, id_room_type)