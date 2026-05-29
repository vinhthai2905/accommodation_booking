from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
import math

from apps.app_location.models import Bien

class DistanceToBeachView(APIView):
    permission_classes = []  # Public access since it's just a calculator for onboarding

    def get(self, request: Request, *args, **kwargs):
        try:
            lat = float(request.query_params.get("lat"))
            lng = float(request.query_params.get("lng"))
        except (TypeError, ValueError):
            return Response(
                {"error": "Invalid latitude or longitude provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        threshold = float(request.query_params.get("threshold", 2000.0))
        beaches = list(Bien.objects.all())

        if not beaches:
            return Response(
                {"error": "No beach data available to compare."},
                status=status.HTTP_404_NOT_FOUND
            )

        min_dist = None
        nearest_beach_name = None
        lon1, lat1 = lng, lat

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

        return Response({
            "distance_meters": int(min_dist),
            "is_near_beach": min_dist <= threshold,
            "nearest_beach": nearest_beach_name
        }, status=status.HTTP_200_OK)
