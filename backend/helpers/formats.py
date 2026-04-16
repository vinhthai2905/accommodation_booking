from apps.app_nguoidung.models import NguoiDung

def get_user_name(user: NguoiDung):
    return f"{user.personal_info.first_name} {user.personal_info.last_name}"

def get_email(user: NguoiDung):
    return f"{user.get_email_field_name}"