from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import exceptions, status

from django.utils import timezone

from apps.app_booking.models import DatPhong
from apps.app_user.models import NguoiDung
from apps.app_booking.api.public.bookings_users.serializers import (
    UserBookingListSerializer,
    FilterBookingSerializer
)

from apps.app_booking.api.permission import UserIsCustomer


class UserBookingListView(APIView):
    """Return all bookings (past and active) for the authenticated user."""

    permission_classes = [UserIsCustomer]
    serializer_class = UserBookingListSerializer

    def _validate_filtering_bookings(self, current_tab: str):
        if current_tab is None:
            raise exceptions.ValidationError({
                "tab": "Must be given to filter."
            })
            
        current_tab = current_tab.lower()
        
        filtering_serializer = (
            FilterBookingSerializer(data={"current_tab": current_tab})
        )
        filtering_serializer.is_valid(raise_exception=True)
        
        return filtering_serializer.validated_data["current_tab"]

    def _get_user(self, request: Request) -> NguoiDung:
        if not request.user or not request.user.is_authenticated:
            raise exceptions.AuthenticationFailed("Authentication required.")
        return request.user
    
    def filter_bookings(self, current_tab, current_user: NguoiDung):
        today = timezone.localdate()
        
        bookings = (
            DatPhong.objects
            .filter(id_user=current_user)
            .select_related("id_hotel", "invoice")
            .order_by("-created_at")
        )
        
        if current_tab == "upcoming":
            return (
                bookings.exclude(status__icontains="CANCELLED")
                .filter(check_in_date__gte=today)
            )
        
        elif current_tab == "past":
            return (
                bookings.exclude(status__icontains="CANCELLED")
                .filter(check_out_date__lt =today)
            )
        
        elif current_tab == "cancelled":
            return (
                bookings
                .filter(status__icontains="CANCELLED")
            )
            

    def get(self, request: Request, *args, **kwargs):
        current_tab = self._validate_filtering_bookings(request.query_params.get("tab", None))
        current_user = self._get_user(request)
        
        bookings = self.filter_bookings(current_tab, current_user)

        serializer = self.serializer_class(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
