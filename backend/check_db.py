import os
import sys
import django

# Setup django
sys.path.append(r"d:\Luyen Python\KHACHSAN\kh2\accommodation_booking\backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from apps.app_location.model.bien_models import Bien
from apps.app_hotel.models import KhachSan

print("Number of beaches:", Bien.objects.count())
print("Hotels and distance_to_beach:")
for k in KhachSan.objects.all():
    print(f"- {k.name}: {k.distance_to_beach}, {k.is_near_beach}")
