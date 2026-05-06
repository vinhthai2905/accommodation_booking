from rest_framework import exceptions
from rest_framework import status


class ZaloPaymentGatewayException(exceptions.APIException):
    status_code=status.HTTP_502_BAD_GATEWAY
    default_detail = "Zalo payment gateway error."