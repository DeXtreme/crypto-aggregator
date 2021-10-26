from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from datetime import datetime
from dateutil import parser
from .models import Article

class ArticleTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # create test data
        for i in range(0, 20):
            article = Article.objects.create(title=f"Test title{i}",
                                            description="Test description",
                                            link="http://www.testlink.com",
                                            source="Test source",
                                            pubdate=datetime.now(),
                                            image="http://www.testlink.com")
    
    def test_get_articles(self):
        # test retrieving articles
        url = reverse("articles:articles-list")
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        data = response.data
        self.assertEqual(data["count"],15)

    def test_get_latest_articles(self):
        # test retrieving latest articles
        url = reverse("articles:articles-list")
        article = Article.objects.get(id=15)
        response = self.client.get(url,{"next": article.id})
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        data = response.data
        self.assertEqual(data["count"], 5)
        latest = data["results"][0]
        latest_pubdate = parser.parse(latest["pubdate"])
        self.assertGreater(latest_pubdate, article.pubdate)

    def test_get_previous_articles(self):
        # test previous articles
        url = reverse("articles:articles-list")
        article = Article.objects.get(id=6)
        response = self.client.get(url,{"prev": article.id})
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        data = response.data
        self.assertEqual(data["count"], 5)
        previous = data["results"][0]
        previous_pubdate = parser.parse(previous["pubdate"])
        self.assertLess(previous_pubdate, article.pubdate)


