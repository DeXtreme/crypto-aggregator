from django.db import models
from django.db.models import fields
from django.db.models.fields import CharField
from rest_framework.serializers import ModelSerializer, CharField
from .models import Order, Location, Region

class RegionSerializer(ModelSerializer):
    class Meta:
        model = Region
        fields = ["id","name","locations"]
        depth = 1
class LocationSerializer(ModelSerializer):
    region = CharField(source="region.name")
    class Meta:
        model = Location
        fields = "__all__"
class OrderSerializer(ModelSerializer):
    location = LocationSerializer(read_only=True)
    class Meta:
        model = Order
        exclude = ["account"]


class NewOrderSerializer(ModelSerializer):
     class Meta:
        model = Order
        fields = '__all__'
        extra_kwargs = {"account": {"write_only":True}}

