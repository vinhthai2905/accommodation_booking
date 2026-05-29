from rest_framework.permissions import BasePermission
from rest_framework.request import Request


class IsAuthenticatedUserActive(BasePermission):
    message = "User is inactive."

    def has_permission(self, request: Request, view):
        return request.user.is_active


class IsCustomer(BasePermission):
    message = "Only customer accounts can access this endpoint."

    def has_permission(self, request: Request, view):
        user = request.user
        
        if not user or not user.is_authenticated:
            return False

        return user.role_set.filter(id_role__role_name="Khách hàng").exists()
