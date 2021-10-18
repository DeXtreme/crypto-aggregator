from django.db import models

# Create your models here.

class Article(models.Model):
    """
    Model to store articles

    Attributes
    ----------
    title : str
        The title of the article
    link : str
        The link to the article
    image : str Optional
        A link to the image associate with the article
        if any
    description : str
        The description of the article
    source : str
        The source of the article
    pubdate : datetime
        The publishing date

    """
    title = models.CharField(max_length=200)
    link = models.URLField()
    image = models.URLField(null=True)
    description = models.CharField(max_length=2000)
    source = models.CharField(max_length=100)
    pubdate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.source}"

