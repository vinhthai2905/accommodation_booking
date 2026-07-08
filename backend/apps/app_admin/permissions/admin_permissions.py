from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Allows access only to users who have the 'Admin' role or are superusers/staff.
    """
    
    def has_permission(self, request, view):
        if not bool(request.user and request.user.is_authenticated):
            return False
            
        if request.user.is_staff or request.user.is_superuser:
            return True
            
        if request.user.role_set.filter(id_role__role_name="Admin").exists():
            return True
            
        return False
