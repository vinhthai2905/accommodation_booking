import pandas as pd

from sklearn.preprocessing import MultiLabelBinarizer
from apps.app_ai.helpers.amenity_helpers import ( 
    ALL_AMENITIES,
    parse_amenities,
    compute_amenity_score,
)

def clean_hotel_data(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    
    df["gia_phong_thap_nhat"] = df["gia_phong_thap_nhat"].astype(float)
    df["khoan_cach_toi_bien"] = df["khoan_cach_toi_bien"].astype(float)
    df["gan_bien"] = (
        df["gan_bien"]
        .astype(str)
        .str.lower()
        .map({"true": 1, "false": 0, "1": 1, "0": 0})
        .fillna(0)
        .astype(int)
    )
    df["amenity_list"] = df["tien_nghi"].apply(parse_amenities)
    
    return df

def build_feature_matrix(df: pd.DataFrame) -> pd.DataFrame:
    amenity_count = df["amenity_list"].apply(len)
    amenity_score = df["amenity_list"].apply(compute_amenity_score)
    
    mlb = MultiLabelBinarizer(classes=ALL_AMENITIES)
    amenity_matrix = pd.DataFrame(
        mlb.fit_transform(df["amenity_list"]),
        columns=[f"has__{a}" for a in ALL_AMENITIES],
        index=df.index,
    )
    
    feature_df = pd.concat(
        [
            df[["gia_phong_thap_nhat", "khoan_cach_toi_bien", "gan_bien"]],
            amenity_count.rename("amenity_count"),
            amenity_score.rename("amenity_score"),
            amenity_matrix,
        ],
        axis=1,
    )
    
    return feature_df

def compute_recommendation_score(df: pd.DataFrame) -> pd.Series:
    price_score   = 10.0 / (1 + df["gia_phong_thap_nhat"] / 300_000)                    
    amenity_bonus = (df["amenity_list"].apply(compute_amenity_score) / 2).clip(upper=10) 
    beach_dist    = 3.0  / (1 + df["khoan_cach_toi_bien"] / 1_000)                      
    beach_flag    = df["gan_bien"].astype(int) * 1.0                                     
    return price_score + amenity_bonus + beach_dist + beach_flag