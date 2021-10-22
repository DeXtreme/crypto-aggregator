from django.urls import path
from .views import SignIn

app_name = "account"

urlpatterns = [
    path("signin", SignIn.as_view(), name="signin")
]