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
    source_icon : str Optional
        A link to the icon of the source

    """
    title = models.CharField(max_length=200)
    link = models.URLField()
    image = models.URLField(null=True)
    description = models.CharField(max_length=2000)
    source = models.CharField(max_length=50)
    source_icon = models.URLField(null=True)

    def __str__(self):
        return f"{self.title} by {self.source}"

