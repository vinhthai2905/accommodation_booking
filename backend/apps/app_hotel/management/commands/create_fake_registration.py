from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.app_hotel.model.don_dang_ky_khach_san_models import DonDangKyKhachSan, TrangThaiDangKyChoice
from apps.app_user.models import NguoiDung
from apps.app_location.model.phuong_models import Phuong
from apps.app_hotel.model.khach_san_models import LoaiKhachSan

class Command(BaseCommand):
    help = 'Creates or updates a fake hotel registration with status "Đã duyệt"'

    def add_arguments(self, parser):
        parser.add_argument('--email', type=str, default='test_partner@gmail.com', help='Email of the user')
        parser.add_argument('--hotel', type=str, default='ruby star da nang central my khe beach', help='Name of the hotel')

    def handle(self, *args, **kwargs):
        email = kwargs['email']
        hotel_name = kwargs['hotel']

        try:
            user = NguoiDung.objects.get(email=email)
        except NguoiDung.DoesNotExist:
            self.stdout.write(self.style.ERROR(f"User with email {email} does not exist."))
            return

        ward = Phuong.objects.first()
        hotel_type = LoaiKhachSan.objects.first()

        if not ward or not hotel_type:
            self.stdout.write(self.style.ERROR("Missing Phuong or LoaiKhachSan in DB. Cannot create registration."))
            return

        registrations = DonDangKyKhachSan.objects.filter(id_user=user, hotel_name=hotel_name)
        
        if registrations.exists():
            for reg in registrations:
                reg.status = TrangThaiDangKyChoice.DA_DUYET
                if not reg.approved_at:
                    reg.approved_at = timezone.now()
                reg.save()
                self.stdout.write(self.style.SUCCESS(f"Updated existing registration for '{hotel_name}' to 'Đã duyệt'."))
        else:
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
            self.stdout.write(self.style.SUCCESS(f"Created new registration for '{hotel_name}' with status 'Đã duyệt'."))
