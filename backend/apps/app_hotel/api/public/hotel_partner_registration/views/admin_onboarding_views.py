from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

from django.utils import timezone
from django.utils.text import slugify

from apps.app_hotel.models import DonDangKyKhachSan
from apps.app_hotel.api.public.hotel_partner_registration.serializers.admin_onboarding_serializer import AdminDonDangKyKhachSanSerializer
from apps.app_user.choices import RoleChoice
from apps.app_hotel.models import KhachSan


class AdminRegistrationApplicationListView(ListAPIView):
    serializer_class = AdminDonDangKyKhachSanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Allow sorting by newest first
        queryset = DonDangKyKhachSan.objects.all().order_by("-created_at")
        
        status_param = self.request.query_params.get("status", None)
        if status_param and status_param != "Tất cả":
            queryset = queryset.filter(status=status_param)
            
        return queryset

    def list(self, request, *args, **kwargs):
        # Optional: check if user is admin
        # if getattr(request.user, 'role', None) != 'Admin':
        #     raise PermissionDenied("You do not have permission to view this resource.")
        
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdminRegistrationApplicationUpdateView(UpdateAPIView):
    serializer_class = AdminDonDangKyKhachSanSerializer
    permission_classes = [IsAuthenticated]
    queryset = DonDangKyKhachSan.objects.all()
    lookup_field = 'id_registration'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        new_status = request.data.get("status")
        reject_reason = request.data.get("reject_reason", "")

        if new_status not in ["Đã duyệt", "Từ chối", "Chờ duyệt"]:
            return Response({"error": "Trạng thái không hợp lệ."}, status=status.HTTP_400_BAD_REQUEST)

        instance.status = new_status
        if new_status == "Đã duyệt":
            instance.approved_at = timezone.now()
            instance.reject_reason = None
            
            # Update user role to Partner if needed
            user = instance.id_user
            from apps.app_user.model.vai_tro_models import VaiTro, VaiTroNguoiDung
            try:
                partner_role = VaiTro.objects.get(role_name=RoleChoice.PARTNER)
                if not VaiTroNguoiDung.objects.filter(id_user=user, id_role=partner_role).exists():
                    VaiTroNguoiDung.objects.create(id_user=user, id_role=partner_role)
            except VaiTro.DoesNotExist:
                pass
                
            # Create KhachSan if it doesn't exist
            
            if not KhachSan.objects.filter(id_user=user).exists():
                # Generate a unique slug
                base_slug = slugify(instance.hotel_name)
                slug = base_slug
                counter = 1
                while KhachSan.objects.filter(slug=slug).exists():
                    slug = f"{base_slug}-{counter}"
                    counter += 1
                    
                location = None
                if instance.latitude and instance.longitude:
                    from django.contrib.gis.geos import Point
                    location = Point(float(instance.longitude), float(instance.latitude), srid=4326)
                    
                KhachSan.objects.create(
                    id_user=user,
                    id_hotel_type=instance.id_hotel_type,
                    id_ward=instance.id_ward,
                    name=instance.hotel_name,
                    address=instance.address,
                    slug=slug,
                    location=location
                )
                
        elif new_status == "Từ chối":
            instance.reject_reason = reject_reason
            instance.approved_at = None
        else:
            instance.reject_reason = None
            instance.approved_at = None

        instance.save()
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
