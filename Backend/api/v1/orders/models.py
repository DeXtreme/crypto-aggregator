from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from v1.account.models import Account

class Region(models.Model):
    """Model to store region information
    
    Attributes
    ----------
    name: str
        The name of the region
    """
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"

class Location(models.Model):
    """Model to store location information
    
    Attributes
    ----------
    region: Region
        The region the location is in
    name: str
        The name of the location
    """
    region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name="locations")
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} in {self.region.name}"

class Order(models.Model):
    """Model to store user orders
    
    Attributes
    ----------
    account: Account
        The owner of the post
    type: str
        The type of the order
    coin: str
        The ticker of the coin
    price: float
        The price of the coin in GHS
    by: str
        The display name of the poster
    location: Location
        The location of the poster
    """
    type_choices = [("B","Buy"),
                    ("S", "Sell")]
    
    coin_choices = [("BTC","Bitcoin"),
                    ("ETH","Ethereum"),
                    ("USDT","Tether"),
                    ("BUSD", "Binance USD"),
                    ("USDC", "USD Coin")]

    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=type_choices)
    coin = models.CharField(max_length=10, choices=coin_choices)
    price = models.FloatField()
    by = models.CharField(max_length=100)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="orders")


