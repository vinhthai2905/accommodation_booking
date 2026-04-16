from rest_framework.permissions import BasePermission
from rest_framework.request import Request

class IsCustomer(BasePermission):
    message = "Only customer accounts can access this endpoint."
    
    def has_permission(self, request: Request, view):
        if request.user.is_authenticated and request.user.role == "Khách hàng":
            return True
        else:
            return False