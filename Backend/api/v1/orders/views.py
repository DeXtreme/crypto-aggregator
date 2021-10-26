from rest_framework import permissions, serializers
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from .models import Order, Region
from .serializers import OrderSerializer, RegionSerializer
from .permissions import IsPoster

class OrdersViewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields =  {"account" : ["exact"],
                         "type" : ["exact"],
                         "coin" : ["exact"],
                         "price": ["lt","gt"],
                         "location": ["exact"]
                        }

    def get_permissions(self):
        if self.request.method not in permissions.SAFE_METHODS:
            self.permission_classes = [IsAuthenticated, IsPoster]
        return [permission() for permission in self.permission_classes]

class RegionView(ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer