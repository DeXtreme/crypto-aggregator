from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleModelAdmin(admin.ModelAdmin):
    pass