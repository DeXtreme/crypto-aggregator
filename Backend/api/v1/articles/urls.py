from django.urls import path
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet

router = DefaultRouter()
router.register(r"", ArticleViewSet, basename="articles")

urlpatterns = []
urlpatterns += router.urls
