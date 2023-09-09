from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from django.contrib.auth import get_user_model

from photo.serializers import  UserAlbumSerializer
User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    description = serializers.CharField(max_length=255, required=False)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'description', 'email', 'password']

    def validate(self, data):
        user = User(**data)
        password = data.get('password')
        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializer_errors['non_field_errors']}
            )
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            description = validated_data.get('description', ''),
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    useralbums = UserAlbumSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'description', 'email', 'useralbums', 'id']


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField(max_length=255)
    class Meta:
        fields = ['email', 'token']

class ForgottenPasswordSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)
    class Meta:
        fields = ['token', 'password']


class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    class Meta:
        fields = ['password', 'email']
    def validate(self, data):
        password = data.get('password')
        try:
            validate_password(password)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializer_errors['non_field_errors']}
            )
        return data