from rest_framework import exceptions

def validate_booking_date(attrs: dict):
    if attrs["check_out"] <= attrs["check_in"]:
        raise exceptions.ValidationError(
            {"check_out": "Check_out date must be after check_in date"}
        )
