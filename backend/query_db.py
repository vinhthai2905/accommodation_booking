import os
import sys
import traceback

log_file = open("query_db.log", "w", encoding="utf-8")

def log(msg):
    print(msg)
    log_file.write(str(msg) + "\n")
    log_file.flush()

try:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hotel_booking.settings')
    
    import django
    django.setup()
    
    from apps.app_user.models import NguoiDung
    from apps.app_hotel.models import KhachSan
    
    log("DJANGO SETUP OK")
    log(f"USERS count: {NguoiDung.objects.count()}")
    for u in NguoiDung.objects.all():
        log(f"User: ID={u.id_user}, Email={u.email}, Active={u.is_active}, Superuser={u.is_superuser}, Staff={u.is_staff}")
        
    log(f"HOTELS count: {KhachSan.objects.count()}")
    for h in KhachSan.objects.all():
        log(f"Hotel: ID={h.id_hotel}, Name={h.name}, Owner_ID={h.id_user_id}")
        
except Exception as e:
    tb = traceback.format_exc()
    log("ERROR:")
    log(tb)

log_file.close()
