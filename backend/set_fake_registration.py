import os
import sys
import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hotel_booking.settings')
django.setup()

from apps.app_hotel.model.don_dang_ky_khach_san_models import DonDangKyKhachSan, TrangThaiDangKyChoice
from apps.app_user.models import NguoiDung
from apps.app_location.model.phuong_models import Phuong
from apps.app_hotel.model.khach_san_models import LoaiKhachSan

def main():
    email = "test_partner@gmail.com"
    hotel_name = "ruby star da nang central my khe beach"

    try:
        user = NguoiDung.objects.get(email=email)
    except NguoiDung.DoesNotExist:
        print(f"[-] User with email {email} does not exist.")
        return

    ward = Phuong.objects.first()
    hotel_type = LoaiKhachSan.objects.first()

    if not ward or not hotel_type:
        print("[-] Missing Phuong or LoaiKhachSan in DB. Cannot create registration.")
        return

    # Try to find an existing registration for this user and hotel name
    registrations = DonDangKyKhachSan.objects.filter(id_user=user, hotel_name=hotel_name)
    
    if registrations.exists():
        for reg in registrations:
            reg.status = TrangThaiDangKyChoice.DA_DUYET
            if not reg.approved_at:
                reg.approved_at = timezone.now()
            reg.save()
            print(f"[+] Updated existing registration for '{hotel_name}' to 'Đã duyệt'.")
    else:
        # Create a new one if it doesn't exist
        DonDangKyKhachSan.objects.create(
            id_user=user,
            hotel_name=hotel_name,
            id_hotel_type=hotel_type,
            id_ward=ward,
            address="138 Nguyễn Văn Thoại",
            phone_number="0123456789",
            status=TrangThaiDangKyChoice.DA_DUYET,
            approved_at=timezone.now()
        )
        print(f"[+] Created new registration for '{hotel_name}' with status 'Đã duyệt'.")

if __name__ == "__main__":
    main()
