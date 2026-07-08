import os
from django.conf import settings

try:
    _base_dir = str(settings.BASE_DIR)
except Exception:
    _base_dir = os.path.join(os.path.dirname(__file__), "..", "..", "..")
    _base_dir = os.path.abspath(_base_dir)
DATASET_PATH = os.path.join(
    _base_dir,
    "apps",
    "app_ai",
    "training_dataset",
    "train_hotel_cleaned_dataset.csv",
)
MODEL_PATH = os.path.join(
    _base_dir,
    "apps",
    "app_ai",
    "bumblebee_models",
    "bumblebee_hotel_recommendation_model.pkl",
)