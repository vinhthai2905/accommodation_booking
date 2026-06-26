import os
import sys
import joblib
import numpy as np
import pandas as pd

from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import cross_val_score

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", ".."))

from apps.app_ai.helpers.amenity_helpers import ( 
    AMENITY_WEIGHTS,
    ALL_AMENITIES,
    parse_amenities,
)

from apps.app_ai.helpers.train_bumblebee_helpers import build_feature_matrix, compute_recommendation_score
from apps.app_ai.config.settings import MODEL_PATH, DATASET_PATH

def load_and_prepare_data(dataset_path: str):
    df = pd.read_csv(dataset_path, encoding="utf-8-sig")

    X = build_feature_matrix(df)

    df["amenity_list"] = df["tien_nghi"].apply(parse_amenities)
    df["gan_bien"] = (
        df["gan_bien"]
        .astype(str)
        .str.lower()
        .map({"true": 1, "false": 0, "1": 1, "0": 0})
        .fillna(0)
        .astype(int)
    )
    df["khoan_cach_toi_bien"] = df["khoan_cach_toi_bien"].astype(float)
    df["gia_phong_thap_nhat"] = df["gia_phong_thap_nhat"].astype(float)

    y = compute_recommendation_score(df)
    
    return df, X, y

def train_and_evaluate_model(X: pd.DataFrame, y: pd.Series):
    model = GradientBoostingRegressor(
        n_estimators=300,
        max_depth=4,
        learning_rate=0.05,
        subsample=0.8,
        random_state=42,
    )

    cv_scores = cross_val_score(model, X, y, cv=5, scoring="r2")
    print(f"Cross-val R² scores: {np.round(cv_scores, 4)}")
    print(f"Mean R²: {cv_scores.mean():.4f}  ±  {cv_scores.std():.4f}")

    model.fit(X, y)
    return model

def export_model_bundle(model, feature_columns: list[str]):
    artifact = {
        "model": model,
        "all_amenities": ALL_AMENITIES,
        "amenity_weights": AMENITY_WEIGHTS,
        "feature_columns": feature_columns,
    }
    
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(artifact, MODEL_PATH)
    print("\n Bumblebee model trained and saved to:", MODEL_PATH)

def print_training_report(df: pd.DataFrame, X: pd.DataFrame, y: pd.Series, model):
    df["recommendation_score"] = y
    df["predicted_score"] = model.predict(X)

    report = df[["ten_khach_san", "gia_phong_thap_nhat", "gan_bien",
                 "recommendation_score", "predicted_score"]].sort_values(
        "recommendation_score", ascending=False
    )
    print("\n── Hotel Recommendation Scores ───────────────────────────────")
    print(report.to_string(index=False))

    importances = pd.Series(model.feature_importances_, index=X.columns)
    print("\n── Top 15 Feature Importances ────────────────────────────────")
    print(importances.nlargest(15).round(4).to_string())


def bumblebee_train():
    df, X, y = load_and_prepare_data(DATASET_PATH)
    
    model = train_and_evaluate_model(X, y)
    
    export_model_bundle(model, list(X.columns))
    
    print_training_report(df, X, y, model)


if __name__ == "__main__":
    bumblebee_train()