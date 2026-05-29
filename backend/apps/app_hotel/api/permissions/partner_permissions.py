from rest_framework.permissions import BasePermission
from rest_framework.request import Request


class IsAuthenticatedPartner(BasePermission):
    message = "User must be authenticated and have partner role."

    def has_permission(self, request: Request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        return (
            user.role_set.select_related("id_role")
            .filter(id_role__role_name="Đối tác")
            .exists()
        )



