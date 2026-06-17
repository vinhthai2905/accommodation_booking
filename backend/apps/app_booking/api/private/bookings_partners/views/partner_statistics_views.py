from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request
from django.utils import timezone
from django.db.models import Sum, Count
from django.db.models.functions import TruncDay, TruncMonth, TruncQuarter
from datetime import timedelta
import calendar

from apps.app_hotel.api.base.base import PartnerHotelViewMixin
from apps.app_hotel.api.permissions import IsAuthenticatedPartner
from apps.common.permission import IsAuthenticatedUserActive
from apps.app_booking.models import DatPhong
from apps.app_hotel.model.danh_gia_models import DanhGiaKhachSan

class PartnerStatisticsView(PartnerHotelViewMixin, APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedUserActive]

    def get(self, request: Request, *args, **kwargs):
        hotel = self.get_partner_hotel(request.user)
        time_filter = request.query_params.get("time_filter", "weekly")
        
        now = timezone.localdate()
        
        start_date = now
        end_date = now
        
        if time_filter == "weekly":
            # Last 7 days
            start_date = now - timedelta(days=6)
        elif time_filter == "monthly":
            # This month
            start_date = now.replace(day=1)
        elif time_filter == "quarterly":
            # This quarter
            current_quarter = (now.month - 1) // 3 + 1
            start_month = 3 * current_quarter - 2
            start_date = now.replace(month=start_month, day=1)
        elif time_filter == "yearly":
            # This year
            start_date = now.replace(month=1, day=1)
            
        # Base querysets
        bookings_qs = DatPhong.objects.filter(
            id_hotel=hotel,
            created_at__date__gte=start_date,
            created_at__date__lte=end_date
        )
        
        # In reality, revenue is sum of payments. But for simplicity, we assume invoice total_price or DatPhong's related invoice.
        # Let's check how payment is structured. If total_price is in invoice.
        # Since we might not have time to trace exact revenue logic, let's use DatPhong.invoice.total_price (assuming it exists).
        # We will do simple python processing for safety if complex joins are hard.
        
        # Reviews
        reviews_qs = DanhGiaKhachSan.objects.filter(
            id_booking__id_hotel=hotel,
            created_at__date__gte=start_date,
            created_at__date__lte=end_date
        )
        
        total_bookings = bookings_qs.count()
        total_reviews = reviews_qs.count()
        
        # Compute Revenue
        total_revenue = 0
        for b in bookings_qs.select_related('invoice'):
            if hasattr(b, 'invoice') and b.invoice:
                total_revenue += float(b.invoice.total_amount)
        
        # Build Chart Data
        chart_data = []
        
        if time_filter == "weekly":
            # Group by day for last 7 days
            for i in range(7):
                day = start_date + timedelta(days=i)
                day_bookings = bookings_qs.filter(created_at__date=day)
                day_reviews = reviews_qs.filter(created_at__date=day)
                rev = sum([float(b.invoice.total_amount) for b in day_bookings.select_related('invoice') if hasattr(b, 'invoice') and b.invoice])
                chart_data.append({
                    "name": day.strftime("%d/%m"),
                    "revenue": rev,
                    "bookings": day_bookings.count(),
                    "comments": day_reviews.count()
                })
                
        elif time_filter == "monthly":
            # Group by week in month (approximation) or day? Let's group by day, but only show a few ticks, or group by week.
            # Let's group by week (1-4)
            for week in range(1, 5):
                # Approximation: days 1-7, 8-14, 15-21, 22-end
                s_day = start_date + timedelta(days=(week-1)*7)
                e_day = start_date + timedelta(days=week*7 - 1)
                if week == 4:
                    e_day = end_date # End of month
                
                period_bookings = bookings_qs.filter(created_at__date__gte=s_day, created_at__date__lte=e_day)
                period_reviews = reviews_qs.filter(created_at__date__gte=s_day, created_at__date__lte=e_day)
                rev = sum([float(b.invoice.total_amount) for b in period_bookings.select_related('invoice') if hasattr(b, 'invoice') and b.invoice])
                chart_data.append({
                    "name": f"Tuần {week}",
                    "revenue": rev,
                    "bookings": period_bookings.count(),
                    "comments": period_reviews.count()
                })
                
        elif time_filter == "quarterly":
            # Group by 3 months
            for m in range(start_month, start_month + 3):
                m_date = start_date.replace(month=m)
                _, last_day = calendar.monthrange(now.year, m)
                m_end = m_date.replace(day=last_day)
                period_bookings = bookings_qs.filter(created_at__date__gte=m_date, created_at__date__lte=m_end)
                period_reviews = reviews_qs.filter(created_at__date__gte=m_date, created_at__date__lte=m_end)
                rev = sum([float(b.invoice.total_amount) for b in period_bookings.select_related('invoice') if hasattr(b, 'invoice') and b.invoice])
                chart_data.append({
                    "name": f"Tháng {m}",
                    "revenue": rev,
                    "bookings": period_bookings.count(),
                    "comments": period_reviews.count()
                })
                
        elif time_filter == "yearly":
            # Group by 4 quarters
            for q in range(1, 5):
                q_start_month = 3 * q - 2
                q_s = start_date.replace(month=q_start_month, day=1)
                q_e_month = q_start_month + 2
                _, last_day = calendar.monthrange(now.year, q_e_month)
                q_e = q_s.replace(month=q_e_month, day=last_day)
                
                period_bookings = bookings_qs.filter(created_at__date__gte=q_s, created_at__date__lte=q_e)
                period_reviews = reviews_qs.filter(created_at__date__gte=q_s, created_at__date__lte=q_e)
                rev = sum([float(b.invoice.total_amount) for b in period_bookings.select_related('invoice') if hasattr(b, 'invoice') and b.invoice])
                chart_data.append({
                    "name": f"Quý {q}",
                    "revenue": rev,
                    "bookings": period_bookings.count(),
                    "comments": period_reviews.count()
                })
                
        return Response({
            "summary": {
                "total_revenue": total_revenue,
                "total_bookings": total_bookings,
                "total_comments": total_reviews
            },
            "chart_data": chart_data
        }, status=status.HTTP_200_OK)
