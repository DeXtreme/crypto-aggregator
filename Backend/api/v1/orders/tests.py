from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.test import APITestCase
from .models import Region, Location, Order
from v1.account.models import Account
from .serializers import OrderSerializer, RegionSerializer
class RegionsTest(APITestCase):

    def test_region_serializer(self):
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        data = serializer.data
        self.assertIn("name", data[0])
        self.assertIn("locations", data[0])
        self.assertIn("name",data[0]["locations"][0])
    
    def test_location_view(self):
        url = reverse("orders:location-list")
        response = self.client.get(url)
        data = response.data
        self.assertIn("name", data[0])
        self.assertIn("locations", data[0])
        self.assertIn("name",data[0]["locations"][0])

class OrdersTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects\
                   .create_user(username="test",
                                password="test")
        account = Account.objects.create(user=user,
                                              name="Test")
        location = Location.objects.all()[0]
        Order.objects.create(account=account,
                             type="S",
                             coin="BTC",
                             price=50000,
                             by="Test Seller",
                             location=location)
        
        Order.objects.create(account=account,
                             type="S",
                             coin="BTC",
                             price=500,
                             by="Test Seller 2",
                             location=location)
    
    def test_order_serializer(self):
        order = Order.objects.all()
        serializer = OrderSerializer(order,many=True)
        data = serializer.data
        self.assertIn("type", data[0])
        self.assertIn("price", data[0])
        self.assertIn("location", data[0])
        self.assertIn("region", data[0]["location"])

    def test_order_view_list(self):
        url = reverse("orders:orders-list")
        response = self.client.get(url)
        data = response.data
        self.assertIn("type", data[0])
        self.assertIn("price", data[0])
        self.assertIn("location", data[0])
        self.assertIn("region", data[0]["location"])
    
    
    def test_order_view_filter_account(self):
        account = Account.objects.all()[0]
        url = reverse("orders:orders-list")
        response = self.client.get(url, data={"account":account.id})
        data = response.data
        self.assertEqual(len(data), 2)
        response = self.client.get(url, data={"account":2})
        data = response.data
        print(data, response.status_code)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_order_view_filter_price(self):
        url = reverse("orders:orders-list")
        response = self.client.get(url, data={"price__gt":1000})
        data = response.data
        self.assertEqual(len(data), 1)
     

    def test_order_update(self):
        account = Account.objects.all()[0]
        user = account.user
        self.client.force_authenticate(user=user)
        order = Order.objects.all()[0]
        url = reverse("orders:orders-detail", args=[order.id])
        response = self.client.patch(url, data={"price":1000})
        data = response.data
        self.assertIn("price", data)
        self.assertEqual(data["price"], 1000)
    
    def test_order_delete(self):
        account = Account.objects.all()[0]
        user = account.user
        order = Order.objects.all()[1]
        self.client.force_authenticate(user=user)
        url = reverse("orders:orders-detail", args=[order.id])
        response = self.client.delete(url)
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        

    
    
    