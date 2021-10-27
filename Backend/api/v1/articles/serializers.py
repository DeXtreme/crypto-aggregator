from rest_framework.serializers import ModelSerializer
from .models import Article


class ArticleSerializer(ModelSerializer):
    """Article model serializer"""
    class Meta:
        model = Article
        fields = "__all__"
        read_only = "__all__"