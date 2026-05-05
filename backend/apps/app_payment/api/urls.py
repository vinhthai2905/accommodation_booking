from django.urls import path

from .views.zalo.create_zalo_order_views import TestMacCreateOrder, TestMacCancelOrder, TestMacBankList, CreateZaloOrder


urlpatterns = [
    path("api/test/macorder", TestMacCreateOrder.as_view()),
    path("api/test/macdeleteorder", TestMacCancelOrder.as_view()),
    path("api/test/macbank", TestMacBankList.as_view()),
    
    
    path("api/payments/zalopay/order", CreateZaloOrder.as_view())
]
