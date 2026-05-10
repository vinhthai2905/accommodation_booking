from django.db import models

class RoleChoice(models.TextChoices):
    PARTNER = "Đối tác", "Đối tác"
    CUSTOMER = "Khách hàng", "Khách hàng"


class AuthTypeChoice(models.TextChoices):
    GOOGLE = "Google", "Google",
    EMAIL = "Email", "Email"