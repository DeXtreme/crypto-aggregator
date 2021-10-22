from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    """Model to store account information
    
    Attributes
    ----------
    user : User
        The user model associated to the 
        account
    name : str
        The account username
    photourl: str
        A link to the account profile picture
    """

    user = models.OneToOneField(User, models.CASCADE, related_name="account")
    name = models.CharField(max_length=50)
    photourl = models.URLField(null=True)
    
    def __str__(self):
        return self.username
