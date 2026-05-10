from rest_framework.permissions import BasePermission

class UserIsCustomer(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        
        if not user or not user.is_authenticated:
            return False

        return user.role_set.filter(id_role__role_name="Khách hàng").exists()
        
        # if user.is_authenticated and user.