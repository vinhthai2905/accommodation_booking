from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions
import math

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import KhachSan
from apps.app_location.models import Bien
from apps.app_hotel.api.private.partner_hotel_detail.serializers.hotel_serializers import (
    PartnerHotelSerializer,
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner,
    IsAuthenticatedPartnerActive,
)

class PartnerHotelView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = PartnerHotelSerializer

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

    def get(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        serializer = self.serializer_class(hotel)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        serializer = self.serializer_class(hotel, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateHotelsNearBeachView(APIView):
    permission_classes = []  # One-time API, no auth required by default

    def post(self, request: Request, *args, **kwargs):
        threshold = float(request.query_params.get("threshold", 2000.0))  # Default 2km (2000m)
        hotels = KhachSan.objects.filter(location__isnull=False)
        beaches = list(Bien.objects.all())

        if not beaches:
            return Response(
                {"error": "No beach data available to compare."},
                status=status.HTTP_400_BAD_REQUEST
            )

        updated_count = 0
        details = []

        for hotel in hotels:
            min_dist = None
            nearest_beach_name = None
            lon1, lat1 = hotel.location.x, hotel.location.y

            for beach in beaches:
                lon2, lat2 = beach.beach_location.x, beach.beach_location.y

                # Haversine distance formula
                dlon = math.radians(lon2 - lon1)
                dlat = math.radians(lat2 - lat1)
                a = (math.sin(dlat / 2) ** 2 +
                     math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
                c = 2 * math.asin(math.sqrt(a))
                dist = c * 6371000.0  # distance in meters

                if min_dist is None or dist < min_dist:
                    min_dist = dist
                    nearest_beach_name = beach.name

            if min_dist is not None:
                hotel.distance_to_beach = int(min_dist)
                hotel.is_near_beach = min_dist <= threshold
                hotel.save(update_fields=["distance_to_beach", "is_near_beach"])
                updated_count += 1
                details.append({
                    "hotel_name": hotel.name,
                    "nearest_beach": nearest_beach_name,
                    "distance_meters": int(min_dist),
                    "is_near_beach": hotel.is_near_beach
                })

        return Response({
            "message": f"Successfully updated {updated_count} hotels.",
            "threshold_meters": threshold,
            "details": details
        }, status=status.HTTP_200_OK)

