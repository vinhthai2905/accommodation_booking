from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from apps.app_user.models import NguoiDung, VaiTro
from apps.app_user.api.serializers.admin_user_serializers import AdminUserSerializer, RoleSerializer

class AdminRolesView(ListAPIView):
    serializer_class = RoleSerializer
    queryset = VaiTro.objects.all().order_by('id_role')

class AdminUsersView(ListCreateAPIView):
    serializer_class = AdminUserSerializer
    queryset = NguoiDung.objects.all().order_by('-date_joined')

class AdminUserDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = AdminUserSerializer
    queryset = NguoiDung.objects.all()
    lookup_field = 'id_user'
