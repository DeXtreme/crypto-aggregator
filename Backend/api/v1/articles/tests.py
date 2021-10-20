from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from datetime import datetime
from .models import Article

class ArticleTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        for i in range(0, 20):
            article = Article.objects.create(title=f"Test title{i}",
                                            description="Test description",
                                            link="http://www.testlink.com",
                                            source="Test source",
                                            pubdate=datetime.now(),
                                            image="http://www.testlink.com")
    
    def test_get_articles(self):
        url = reverse("articles:articles-list")
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        json = response.data
        self.assertEqual(json["count"],15)

    def test_get_latest_articles(self):
        url = reverse("articles:articles-list")
        article = Article.objects.get(id=15)
        response = self.client.get(url,{"next": 15})
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        json = response.data
        self.assertEqual(json["count"], 5)

    def test_get_previous_articles(self):
        url = reverse("articles:articles-list")
        response = self.client.get(url,{"prev": 6})
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        json = response.data
        self.assertEqual(json["count"], 5)


