from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count

from apps.app_hotel.model.khach_san_models import LoaiKhachSan

class AdminHotelTypeStatsView(APIView):
    def get(self, request):
        stats = LoaiKhachSan.objects.annotate(
            count=Count('hotels')
        ).values('name', 'count')
        
        return Response(list(stats))
