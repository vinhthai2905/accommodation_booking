import os
import joblib
import pandas as pd

from django.conf import settings
from django.db.models import Min

from apps.app_hotel.models import KhachSan
from apps.app_ai.helpers.amenity_helpers import (
    AMENITY_WEIGHTS,
    compute_amenity_score,
)

from apps.app_ai.config.settings import MODEL_PATH


class BumblebeeRecommendationService:
    _model_bundle = None

    @classmethod
    def _load_model_bundle(cls):
        if cls._model_bundle is None:
            cls._model_bundle = joblib.load(MODEL_PATH)
        return cls._model_bundle
    
    def _get_hotels_for_processing():
        hotels = KhachSan.objects.annotate(
            min_price=Min("room_types__price"),
        ).prefetch_related("amenities__id_amenity_type")   
        
        return hotels

    @classmethod
    def _get_hotel_amenity_names(cls, hotel: KhachSan) -> list[str]:
        """Collect all amenity display names from a hotel's amenity relations."""
        names: list[str] = []
        for hotel_amenity in hotel.amenities.all():
            name = getattr(hotel_amenity.id_amenity_type, "name", None)
            if name:
                names.append(name.strip())
        return names

    @classmethod
    def _build_feature_row(
        cls,
        price: float,
        distance_to_beach: float,
        is_near_beach: bool,
        amenity_names: list[str],
        all_amenities: list[str],
    ) -> tuple[dict, float]:
        """
        Build the flat feature dictionary that matches the training schema.
        Returns (row_dict, amenity_score) so the caller doesn't recompute it.
        """
        amenity_score = compute_amenity_score(amenity_names)

        row = {
            "gia_phong_thap_nhat": price,
            "khoan_cach_toi_bien": distance_to_beach,
            "gan_bien": int(is_near_beach),
            "amenity_count": len(amenity_names),
            "amenity_score": amenity_score,
        }

        amenity_set = set(amenity_names)
        for amenity in all_amenities:
            row[f"has__{amenity}"] = int(amenity in amenity_set)

        return row, amenity_score

    @classmethod
    def _compute_amenity_match_bonus(
        cls,
        hotel_amenity_set: set[str],
        desired_amenities: list[str],
    ) -> tuple[float, list[str]]:
        """
        Return (bonus_score, matched_amenity_names) for each desired amenity
        the hotel actually has. Uses AMENITY_WEIGHTS for the bonus magnitude.
        """
        matched: list[str] = []
        bonus: float = 0.0
        for amenity in desired_amenities:
            if amenity in hotel_amenity_set:
                matched.append(amenity)
                bonus += AMENITY_WEIGHTS.get(amenity, 0.3)
        return bonus, matched

    @classmethod
    def _score_hotel(
        cls,
        hotel: KhachSan,
        hotel_amenity_names: list[str],
        all_amenities: list[str],
        feature_columns: list[str],
        model,
        desired_amenities: list[str],
        prefer_cheap: bool = False,
        prefer_no_beach: bool = False,
        prefer_beach: bool = False,
    ) -> tuple[float, float, list[str]]:
        """
        Run the ML model and apply personalised bonuses.
        Returns (final_score, amenity_quality_score, matched_amenities).
        """
        price             = float(hotel.min_price)
        distance_to_beach = float(hotel.distance_to_beach or 9_999)
        is_near_beach     = bool(hotel.is_near_beach)

        row, amenity_quality_score = cls._build_feature_row(
            price=price,
            distance_to_beach=distance_to_beach,
            is_near_beach=is_near_beach,
            amenity_names=hotel_amenity_names,
            all_amenities=all_amenities,
        )

        input_df   = pd.DataFrame([row])[feature_columns]
        base_score = float(model.predict(input_df)[0])

        amenity_bonus, matched_amenities = cls._compute_amenity_match_bonus(
            hotel_amenity_set=set(hotel_amenity_names),
            desired_amenities=desired_amenities,
        )

        no_match_penalty = -5.0 if (desired_amenities and not matched_amenities) else 0.0

        cheap_bonus = (10.0 / (1 + price / 300_000)) if prefer_cheap else 0.0
        
        no_beach_penalty = -15.0 if (prefer_no_beach and is_near_beach) else 0.0
        not_beach_penalty = -15.0 if (prefer_beach and not is_near_beach) else 0.0

        return base_score + amenity_bonus + cheap_bonus + no_match_penalty + no_beach_penalty + not_beach_penalty, amenity_quality_score, matched_amenities

    @classmethod
    def _build_hotel_entry(
        cls,
        hotel: KhachSan,
        hotel_amenity_names: list[str],
        final_score: float,
        amenity_quality_score: float,
        matched_amenities: list[str],
    ) -> dict:
        """Assemble the result dict returned to the API layer."""
        return {
            "hotel": hotel,
            "score": final_score,
            "sub_scores": {
                "price": float(hotel.min_price),
                "distance_to_beach": float(hotel.distance_to_beach or 9_999),
                "is_near_beach": bool(hotel.is_near_beach),
                "amenity_quality_score": round(amenity_quality_score, 2),
                "top_amenities": sorted(
                    hotel_amenity_names,
                    key=lambda a: AMENITY_WEIGHTS.get(a, 0.3),
                    reverse=True,
                )[:5],
                "matched_amenities": matched_amenities,
                "desired_amenities_match_count": len(matched_amenities),
            },
        }


    @classmethod
    def get_hotel_recommendations(
        cls,
        limit: int = 10,
        desired_amenities: list[str] | None = None,
        prefer_cheap: bool = False,
        prefer_no_beach: bool = False,
        prefer_beach: bool = False,
    ) -> list[dict]:
        model_bundle    = cls._load_model_bundle()
        model           = model_bundle["model"]
        all_amenities   = model_bundle["all_amenities"]
        feature_columns = model_bundle["feature_columns"]

        desired_amenities = desired_amenities or []
        recommendations   = []

        hotels = cls._get_hotels_for_processing()

        for hotel in hotels:
            if hotel.min_price is None:
                continue

            hotel_amenity_names = cls._get_hotel_amenity_names(hotel)

            final_score, amenity_quality_score, matched_amenities = cls._score_hotel(
                hotel=hotel,
                hotel_amenity_names=hotel_amenity_names,
                all_amenities=all_amenities,
                feature_columns=feature_columns,
                model=model,
                desired_amenities=desired_amenities,
                prefer_cheap=prefer_cheap,
                prefer_no_beach=prefer_no_beach,
                prefer_beach=prefer_beach,
            )

            recommendations.append(cls._build_hotel_entry(
                hotel=hotel,
                hotel_amenity_names=hotel_amenity_names,
                final_score=final_score,
                amenity_quality_score=amenity_quality_score,
                matched_amenities=matched_amenities,
            ))

        recommendations.sort(key=lambda item: item["score"], reverse=True)
        return recommendations[:limit]