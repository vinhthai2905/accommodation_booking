from django.db.models import Min, Q, Count
from apps.app_hotel.models import KhachSan
import math

class RecommendationService:
    @classmethod
    def get_recommendations(cls, w_price=1.0, w_beach=1.0, w_amenity=1.0, limit=10):
        # Query all hotels
        # Annotate minimum room price (using related_name "room_types" from LoaiPhong)
        # Annotate count of public amenities (using related_name "amenities" from TienNghiKhachSan)
        hotels = KhachSan.objects.annotate(
            min_price=Min('room_types__price'),
            public_amenity_count=Count(
                'amenities',
                filter=Q(amenities__id_amenity_type__scope='Công cộng')
            )
        )
        
        # If there are no hotels, return empty
        if not hotels.exists():
            return []
            
        # Collect lists to compute overall min/max
        prices = [float(h.min_price) for h in hotels if h.min_price is not None]
        amenity_counts = [h.public_amenity_count for h in hotels]
        
        min_price_all = min(prices) if prices else 0.0
        max_price_all = max(prices) if prices else 0.0
        max_amenities_all = max(amenity_counts) if amenity_counts else 0
        
        results = []
        for hotel in hotels:
            # 1. Price Score (Value-for-money)
            # Standard normalization: lower price is better.
            price_val = float(hotel.min_price) if hotel.min_price is not None else max_price_all
            if max_price_all > min_price_all:
                price_score = 1.0 - (price_val - min_price_all) / (max_price_all - min_price_all)
            else:
                price_score = 1.0
                
            # 2. Beach Proximity Score
            if hotel.is_near_beach and hotel.distance_to_beach is not None:
                beach_score = math.exp(-float(hotel.distance_to_beach) / 500.0)
            else:
                beach_score = 0.0
                
            # 3. Amenity Richness Score
            if max_amenities_all > 0:
                amenity_score = float(hotel.public_amenity_count) / float(max_amenities_all)
            else:
                amenity_score = 0.0
                
            # Calculate total weighted score
            total_weight = float(w_price + w_beach + w_amenity)
            if total_weight > 0:
                score = (float(w_price) * price_score + float(w_beach) * beach_score + float(w_amenity) * amenity_score) / total_weight
            else:
                score = 0.0
                
            results.append({
                "hotel": hotel,
                "score": score,
                "sub_scores": {
                    "price": price_score,
                    "beach": beach_score,
                    "amenity": amenity_score
                }
            })
            
        # Sort recommendations by final score descending, limit the result set
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:limit]
