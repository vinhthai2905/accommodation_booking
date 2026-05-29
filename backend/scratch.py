import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from apps.app_user.model.nguoi_dung_models import NguoiDung, ThongTinNguoiDung
from apps.app_user.api.public.users.serializers.user_serializers import UserSerializer

user = NguoiDung.objects.first()
if user:
    print(f"Testing with user: {user.email}")
    data = {"personal_info": {"display_name": "Test Name 123"}}
    serializer = UserSerializer(user, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        print("Success!", serializer.data)
    else:
        print("Errors:", serializer.errors)
else:
    print("No users found.")
