
from uuid import UUID
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response


from .serializers import  ForgottenPasswordSerializer, PasswordSerializer, User, UserCreateSerializer, UserSerializer, EmailSerializer

class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)

class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
            user = request.user
            user = UserSerializer(user)

            return Response(user.data , status=status.HTTP_200_OK)


from django.core.mail import send_mail
from django.conf import settings

class GetProfileView(APIView):
    def get(self, request):
        id = request.query_params.get('id')
        print(id)
        if User.objects.filter(id = int(id)).exists():
            user = User.objects.get(id=id)
            user = UserSerializer(user)
            return Response(user.data, status=status.HTTP_200_OK)
        else:
            Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response(id, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request):
        data = request.data
        serializer = EmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data['email']
        token = serializer.data['token']
        if User.objects.filter(email=email).exists() and UUID(token, version=4):
            user = User.objects.get(email=email)
            user.reset_password_token = token
            user.save()
            subject = 'Your password reset link: '
            message = f'Hi, click on the link to reset your password: http://localhost:3000/new-password/{token}'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail(subject, message, email_from , recipient_list)
            return Response(True, status=status.HTTP_200_OK)

        else:
          return Response(False, status=status.HTTP_400_BAD_REQUEST)

class ChangeForgottenPassWordView(APIView):
        def post(self, request):
            data = request.data
            serializer = ForgottenPasswordSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            token = serializer.data['token']
            password = serializer.data['password']
            if User.objects.filter(reset_password_token=token).exists() and token != '':
                user = User.objects.get(reset_password_token=token)
                user.set_password(password)
                user.reset_password_token = ''
                user.save()
                return Response(True, status=status.HTTP_200_OK)
            else:
                print('error')
                return Response(False, status=status.HTTP_400_BAD_REQUEST)


class ChangePassWordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        data = request.data
        serializer = PasswordSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        password = serializer.data['password']
        email = serializer.data['email']
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            user.set_password(password)
            user.save()
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

