from apps.app_hotel.models import KhachSan

def get_full_address(obj: KhachSan):
    ward_name = obj.id_ward.ward_name
    city_name = obj.id_ward.id_city.city_name
    return (
        f"{obj.address}, {ward_name}, {city_name}" 
        if ward_name and city_name 
        else None
    )
