from rest_framework import permissions, serializers
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.response import Response
from .models import Order, Region
from .serializers import OrderSerializer, RegionSerializer, NewOrderSerializer
from .permissions import IsPoster

class OrdersViewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields =  {"account" : ["exact"],
                         "type" : ["exact"],
                         "coin" : ["exact"],
                         "price": ["lte","gte"],
                         "location": ["exact"],
                         "location__region" : ["exact"]
                        }

    def get_permissions(self):
        if self.request.method not in permissions.SAFE_METHODS:
            self.permission_classes = [IsAuthenticated, IsPoster]
        return [permission() for permission in self.permission_classes]
    
    def get_serializer_class(self):
        if self.request.method not in permissions.SAFE_METHODS:
            return NewOrderSerializer
        else:
            return OrderSerializer
    
    def create(self, request, *args, **kwargs):
        user = request.user
        account = user.account
        serializer = self.get_serializer(data={**request.data,"account":account.pk})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class RegionView(ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer