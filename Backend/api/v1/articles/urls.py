from django.urls import path
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet

app_name = "articles"

router = DefaultRouter()
router.register("", ArticleViewSet, basename="articles")
urlpatterns = router.urls
