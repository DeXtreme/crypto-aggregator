from django.contrib import admin
from rest_framework.fields import ImageField
from .models import Order, Region, Location

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass

@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    pass

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass
