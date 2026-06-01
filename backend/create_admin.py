import os
import django
import sys

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hotel_booking.settings")
django.setup()

from apps.app_user.models import NguoiDung, VaiTro, VaiTroNguoiDung, ThongTinNguoiDung

def create_admin():
    email = "admin@booking.com"
    password = "AdminPassword123!"
    role_name = "Admin"

    # Make sure role exists
    role, _ = VaiTro.objects.get_or_create(role_name=role_name)

    if not NguoiDung.objects.filter(email=email).exists():
        # Create superuser
        user = NguoiDung.objects.create_superuser(
            email=email,
            password=password
        )
        
        # Create profile
        ThongTinNguoiDung.objects.create(
            id_user=user,
            first_name="System",
            last_name="Admin",
            phone_number="0123456789"
        )
        
        # Create user role
        VaiTroNguoiDung.objects.create(
            id_role=role,
            id_user=user
        )
        print(f"✅ Admin user created successfully!\nEmail: {email}\nPassword: {password}")
    else:
        print(f"⚠️ Admin user with email {email} already exists.")

if __name__ == "__main__":
    create_admin()
