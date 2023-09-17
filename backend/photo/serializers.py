from rest_framework import serializers
from photo.models import Album, Photo



class CreateAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['title', 'description', 'thumbnail', 'likes']

    def create(self, validated_data):
        user = validated_data.pop('user')
        album = Album.objects.create(
            title= validated_data['title'],
            description= validated_data['description'],
            thumbnail= validated_data['thumbnail'],
            likes= 0,
            user = user

        )
        return album


class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['caption', 'likes', 'photo', 'album']

    def create(self, validated_data):
        album = validated_data.pop('album')
        createPhoto = Photo.objects.create(
            caption = validated_data['caption'],
            likes = 0,
            photo= validated_data['photo'],
            album = album
        )
        return createPhoto

class UserAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields= ['title', 'description', 'thumbnail', 'likes', 'user', 'id']


class PhotosSerializer(serializers.ModelSerializer):
    album = serializers.SerializerMethodField()
    likedUsers = serializers.SerializerMethodField()
    class Meta:
        model = Photo
        fields = ['caption', 'likes', 'photo', 'album', 'likedUsers']

    def get_album(self, obj):
        return AlbumSerializer(obj.album).data

    def get_likedUsers(self,obj):
         from users.serializers import UserSerializer
         return UserSerializer(obj.likedUsers.all(), many=True).data

class AlbumPhotosSerializer(serializers.ModelSerializer):
    likedUsers = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['caption', 'likes', 'photo', 'album', 'id', 'likedUsers']

    def get_likedUsers(self, obj):
        liked_users = obj.likedUsers.all()
        from users.serializers import UserSerializer
        serializer = UserSerializer(liked_users, many=True)
        return serializer.data

class AlbumSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    photos = AlbumPhotosSerializer(many=True, read_only=True)
    class Meta:
        model = Album
        fields = ['title', 'description', 'thumbnail', 'likes', 'user', 'photos', 'id']
    def get_user(self, obj):

        from users.serializers import UserSerializer
        return UserSerializer(obj.user).data


