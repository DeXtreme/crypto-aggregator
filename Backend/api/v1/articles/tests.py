from Backend.api.v1 import articles
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from datetime import datetime
from .models import Article

class ArticleTest(APITestCase):

    def setUp(self):
        for i in range(0, 20):
            article = Article.objects.create(title=f"Test title{i}",
                                            description="Test description",
                                            link="http://www.testlink.com",
                                            source="Test source",
                                            pubdate=datetime.now(),
                                            image="http://www.testlink.com")
    
    def getArticlesTest(self):
        url = reverse("articles:articles-list")
        response = self.client.get(url)
        json = response.data
        print(json)
        self.assertEqual(json["count"],15)

    def getLatestArticlesTest(self):
        pass

    def getPreviousArticlesTest(self):
        pass
    


