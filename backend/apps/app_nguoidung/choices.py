from django.db import models

class RoleChoice(models.TextChoices):
    CUSTOMER_PARTNER = "Đối tác", "Đối tác",
    EMPLOYEE_PARTNER = "Nhân viên đối tác", "Nhân viên đối tác"
    CUSTOMER = "Khách hàng", "Khách hàng"


class AuthTypeChoice(models.TextChoices):
    GOOGLE = "Google", "Google",
    EMAIL = "Email", "Email"