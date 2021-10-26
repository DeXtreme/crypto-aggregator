from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet

app_name = "articles"

router = DefaultRouter()
router.register("", ArticleViewSet, basename="articles")
urlpatterns = router.urls
