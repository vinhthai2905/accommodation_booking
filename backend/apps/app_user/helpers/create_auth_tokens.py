from rest_framework_simplejwt.tokens import RefreshToken

from apps.app_user.models import VaiTroNguoiDung, NguoiDung

def create_auth_tokens(user: NguoiDung, role: VaiTroNguoiDung) ->RefreshToken:
    refresh = RefreshToken.for_user(user)
    refresh["active_role"] = role.id_role.role_name
    
    return refresh
    