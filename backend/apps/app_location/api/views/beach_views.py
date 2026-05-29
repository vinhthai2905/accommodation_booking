from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
import math

from apps.app_location.model.bien_models import Bien

class CheckLocationNearBeachView(APIView):
    permission_classes = []

    def get(self, request: Request, *args, **kwargs):
        lat = request.query_params.get("lat")
        lon = request.query_params.get("lon")
        threshold = float(request.query_params.get("threshold", 2000.0))  # Default 2km

        if not lat or not lon:
            return Response({"error": "Latitude and longitude are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            lat = float(lat)
            lon = float(lon)
        except ValueError:
            return Response({"error": "Invalid latitude or longitude."}, status=status.HTTP_400_BAD_REQUEST)

        beaches = list(Bien.objects.all())

        if not beaches:
            return Response(
                {"error": "No beach data available.", "is_near_beach": False},
                status=status.HTTP_200_OK
            )

        min_dist = None
        nearest_beach_name = None

        for beach in beaches:
            lon2, lat2 = beach.beach_location.x, beach.beach_location.y

            # Haversine distance formula
            dlon = math.radians(lon2 - lon)
            dlat = math.radians(lat2 - lat)
            a = (math.sin(dlat / 2) ** 2 +
                 math.cos(math.radians(lat)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
            c = 2 * math.asin(math.sqrt(a))
            dist = c * 6371000.0  # distance in meters

            if min_dist is None or dist < min_dist:
                min_dist = dist
                nearest_beach_name = beach.name

        is_near_beach = False
        if min_dist is not None:
            is_near_beach = min_dist <= threshold

        return Response({
            "is_near_beach": is_near_beach,
            "nearest_beach": nearest_beach_name,
            "distance_meters": int(min_dist) if min_dist is not None else None
        }, status=status.HTTP_200_OK)
