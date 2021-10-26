from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS

class IsPoster(BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        account = request.user.account
        return obj.account.id == account.id