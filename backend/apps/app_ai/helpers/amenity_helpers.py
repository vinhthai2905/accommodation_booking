import re

"""
Shared amenity utilities used by both the training pipeline
and the BumblebeeRecommendationService at inference time.
"""


# Amenity weights  (higher = guests want it more / correlates with quality)

AMENITY_WEIGHTS: dict[str, float] = {
    # Beach / pool lifestyle  ★★★★★
    "Bãi biển":                              5.0,   
    "Hồ bơi vô cực":                         4.5,   
    "Hồ bơi có tầm nhìn":                    4.0,   
    "Hồ bơi trên sân thượng":                3.5,   
    "Quầy bar hồ bơi":                       3.5,   
    "Ghế/ghế dài tắm nắng":                  3.0,   
    "Khăn hồ bơi/bãi biển":                  2.5,   
    "Mái che hồ bơi":                        2.0,   

    # Dining & drinks  ★★★★
    "Nhà hàng":                              4.0,  
    "Quầy bar":                              3.0,  
    "Quầy bar đồ ăn nhẹ":                   2.5,   
    "Rượu vang/sâm panh":                    2.0,  
    "Bữa ăn tự chọn phù hợp với trẻ em":    1.5,   
    "Bữa ăn trẻ em":                         1.0,  
    "Lớp dạy nấu ăn":                        1.5,  

    # Wellness & activities  ★★★★
    "Trung tâm Spa & chăm sóc sức khỏe":    4.0,   
    "Phòng tắm nắng":                        2.5,  
    "Sân hiên phơi nắng":                    2.0,  
    "Tour đi bộ":                            2.0,  
    "Bàn bán tour":                          1.5,  

    # Outdoor & views  ★★★
    "Sân thượng / hiên":                     2.5,  
    "Bàn ghế ngoài trời":                    2.0,  
    "Ô dù che nắng loại to":                 1.5,  
    "Bàn ăn":                                1.0,  

    # Connectivity & convenience  ★★★
    "Wi-Fi có ở các phòng khách sạn và miễn phí": 3.5,  
    "Dịch vụ streaming như Netflix":          2.5, 
    "Mở cửa quanh năm":                      2.0,  
    "Lễ tân 24 giờ":                          2.0, 
    "Nhận/trả phòng cấp tốc":               1.5,   
    "Nhận/trả phòng riêng":                  1.5,  
    "Cho thuê xe đạp":                        1.5, 
    "Thu đổi ngoại tệ":                      1.5,  
    "Máy ATM/rút tiền trong khuôn viên":     1.5,  
    "Dịch vụ đỗ xe cho khách":               1.5,  
    "Giữ hành lí":                            1.0, 
    "Vé đi phương tiện công cộng":            1.0, 
    "Ấm đun nước điện":                       0.5, 

    # Housekeeping & safety  ★★
    "Dọn phòng hằng ngày":                   1.5,   
    "Giặt ủi":                               1.5,   
    "Giặt khô":                              1.0,   
    "Dịch vụ là ủi":                          1.0,  
    "Tủ khóa":                               1.0,   
    "Phòng tắm riêng":                       1.5,   
    "Phòng tắm chung":                        0.5,  
    "Có xuất hóa đơn":                        0.5,  

    # Security  ★
    "Bảo vệ 24/7":                           1.0,   
    "Hệ thống CCTV trong khu vực chung":     0.5,   
    "Hệ thống CCTV bên ngoài chỗ nghỉ":     0.5,   
    "Báo động an ninh":                       0.5,  
    "Thiết bị báo cháy":                      0.5,  
    "Bình chữa cháy":                         0.5,  
}

# Stable sorted list used as the canonical column order for the model
ALL_AMENITIES: list[str] = sorted(AMENITY_WEIGHTS.keys())

# Default weight for amenities not present in the dictionary
DEFAULT_AMENITY_WEIGHT: float = 0.3


def parse_amenities(cell: str) -> list[str]:
    """Split a pipe-separated amenity string into a clean list."""
    if not isinstance(cell, str) or not cell.strip():
        return []
    return [a.strip() for a in cell.split("|") if a.strip()]


def compute_amenity_score(amenity_list: list[str]) -> float:
    """Return the weighted quality score for a list of amenity names."""
    return sum(
        AMENITY_WEIGHTS.get(a, DEFAULT_AMENITY_WEIGHT)
        for a in amenity_list
    )


# Vietnamese stop words to skip when tokenising amenity names for message matching
_STOP_WORDS: set[str] = {
    "các", "và", "có", "ở", "với", "đến", "cho", "của", "này", "tại",
    "một", "là", "không", "trong", "ngoài", "theo",
    # Domain-specific generic tokens that cause false matches
    "dịch",    # half of "dịch vụ" (service) — too broad on its own
    "khách",   # first half of "khách sạn" (hotel)
    "sạn",     # second half of "khách sạn" — still matches WiFi amenity
    "phòng",   # "room" — too generic on its own
}

# Keywords that signal a low-price preference
_CHEAP_KEYWORDS: list[str] = [
    "rẻ", "giá rẻ", "tiết kiệm", "cheap", "budget", "tiền ít", "ít tiền",
    "giá thấp", "phòng rẻ", "affordable", "cost",
]

# Pattern that signals the guest does NOT want a near-beach hotel
_NO_BEACH_PATTERN = re.compile(
    r"không.{0,10}(gần biển|biển|beach|ở biển|sát biển)"
    r"|tránh biển|không thích biển|xa biển",
    re.IGNORECASE,
)

def parse_guest_preferences(message: str) -> dict:
    """
    Parse a guest's natural-language message into structured preference signals.

    Returns a dict with:
      - prefer_cheap      (bool): guest wants a budget-friendly price
      - prefer_no_beach   (bool): guest explicitly does NOT want a near-beach hotel
      - desired_amenities (list[str]): amenity names inferred from the message
    """
    message_lower = message.lower()

    # Split message into a word set for exact word-boundary matching
    # (prevents "khô" from matching inside "không", etc.)
    message_words = set(re.split(r'[\s,.!?;:""()\-/]+', message_lower))

    prefer_cheap    = any(kw in message_lower for kw in _CHEAP_KEYWORDS)
    prefer_no_beach = bool(_NO_BEACH_PATTERN.search(message_lower))

    desired_amenities: list[str] = []
    for amenity_name in AMENITY_WEIGHTS:
        tokens = [
            w.strip("&/,.()")
            for w in amenity_name.lower().split()
            if len(w) >= 3 and w not in _STOP_WORDS
        ]
        # Use word-set membership — not substring — to avoid false positives
        if tokens and any(token in message_words for token in tokens):
            desired_amenities.append(amenity_name)

    return {
        "prefer_cheap": prefer_cheap,
        "prefer_no_beach": prefer_no_beach,
        "desired_amenities": desired_amenities,
    }
