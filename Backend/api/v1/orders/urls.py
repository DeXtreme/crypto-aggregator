from django.db import router
from django.urls import path
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views import OrdersViewSet, RegionView

app_name = "orders"

router = DefaultRouter()
router.register("", OrdersViewSet, basename="orders")
urlpatterns = router.urls

urlpatterns += [path("locations", RegionView.as_view(), name="location-list")]