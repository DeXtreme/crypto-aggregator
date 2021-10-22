import uuid
from django.contrib.auth.models import User
import rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from .models import Account
from .firebase import getFirebaseUser


class SignIn(APIView):
    """A view to signin the user"""

    def post(self, request, format=None):
        if "token" in request.data:
            token = request.data["token"]

            try:
                details = getFirebaseUser(token)
            except Exception as e:
                raise ValidationError({"token":"Invalid token"})

            user = User.objects\
                       .filter(username=details["uid"])\
                       .first()
            if not user:
                user = User.objects\
                           .create_user(username=details["uid"],
                                        password=uuid.uuid4())

                account = Account.objects\
                                 .create(user=user, 
                                         name=details["name"],
                                         photourl=details["photourl"])
            else:
                account = user.account
            
            token = Token.objects.create(user=user)
            
            return Response({"name": account.name,
                             "photoUrl": account.photourl,
                             "token": token.key})
        else:
            raise ValidationError({"token":"Token is required"})

    
