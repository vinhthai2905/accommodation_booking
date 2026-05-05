from django.urls import path

from .views.zalo.create_order_views import TestMacCreateOrder, TestMacCancelOrder, TestMacBankList


urlpatterns = [
    path("api/test/macorder", TestMacCreateOrder.as_view()),
    path("api/test/macdeleteorder", TestMacCancelOrder.as_view()),
    path("api/test/macbank", TestMacBankList.as_view()),
]
