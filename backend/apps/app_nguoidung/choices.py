from django.db import models

class RoleChoice(models.TextChoices):
    CUSTOMER_PARTNER = "Đối tác", "Đối tác",
    CUSTOMER = "Khách hàng", "Khách hàng"
    