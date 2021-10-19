from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import BasePagination
from .models import Article
from .serializers import ArticleSerializer


class ArticlePaginator(BasePagination):
    ARTICLE_LIMIT = 15
    def paginate_queryset(self, queryset, request, view=None):
        params = request.query_params
        if "next" in params:
            id = params["next"]
            articles = queryset.filter(id__gt=id)[:self.ARTICLE_LIMIT]
        elif "prev" in params:
            id = params["prev"]
            articles = queryset.filter(id__lt=id)[:self.ARTICLE_LIMIT]
        else:
            articles = queryset[:self.ARTICLE_LIMIT]
        
        return articles
            
    def get_paginated_response(self, data):
        return Response({
            'count': len(data),
            'results': data
        })

class ArticleViewSet(GenericViewSet,
                     ListModelMixin):

    serializer_class = ArticleSerializer
    pagination_class = ArticlePaginator
    queryset = Article.inorder.all()


