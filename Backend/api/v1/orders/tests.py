from rest_framework import serializers
from rest_framework.test import APITestCase
from .models import Region, Location
from .serializers import RegionSerializer
class RegionsTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        region = Region.objects.create(name="Test region")
        for i in range(5):
            location = Location.objects.create(region=region,name=f"Test Location {i}")

    def test_region_serializer(self):
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        data = serializer.data
        print(data)
        self.assertIn("name", data[0])
        self.assertIn("locations", data[0])
        self.assertEqual(len(data[0]["locations"]), 5)
        self.assertIn("name",data[0]["locations"][0])


        
