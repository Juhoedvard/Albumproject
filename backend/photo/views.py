from django.shortcuts import get_object_or_404, render

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import permissions, status
from rest_framework.response import Response
from photo.models import Album, LikedUsers
from photo.models import Photo

from photo.serializers import  AlbumSerializer, CreateAlbumSerializer, CreatePhotoSerializer, PhotosSerializer


class CreateAlbumView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        data = request.data
        user = request.user
        serializer = CreateAlbumSerializer(data=data, context={'request': request})
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        album = serializer.save(user=request.user)

        album = AlbumSerializer(album)

        return Response(album.data, status=status.HTTP_201_CREATED)


class GetAlbumsView(APIView):
    def get(self, request):
        Albums = Album.objects.all()
        serializer = AlbumSerializer(Albums, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddPhotosView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        data = request.data

        photos = []

        for photo_data in data:
            album_id = photo_data.get('albumID')

            # Etsi album tietokannasta
            try:
                album = Album.objects.get(id=album_id)
            except Album.DoesNotExist:
                return Response({'error': 'Album was not found'}, status=status.HTTP_404_NOT_FOUND)

            # Lisää album kuvadataan
            photo_data['album'] = album.id
            serializer = CreatePhotoSerializer(data=photo_data, context={'request': request})
            if serializer.is_valid():
                photo = serializer.save()
                photos.append(photo)
            else:
                # Käske serializeria tulostamaan virheet debuggausta varten
                print('serializer errorit: ', serializer.errors)

        if photos:
            photo_serializer = PhotosSerializer(photos, many=True)
            return Response(photo_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'No valid photos to create'}, status=status.HTTP_400_BAD_REQUEST)


class LikePhotoView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        data = request.data
        photoID = data.get('id')
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)

        user = request.user
        photo = get_object_or_404(Photo, id=photoID)
        liked_user, created = LikedUsers.objects.get_or_create(photo=photo, user=user )
        if created:
            photo.likes +=1
            photo.save()

        else:
            liked_user.delete()
            photo.likes -= 1
            photo.save()

        serializer = PhotosSerializer(photo)
        print(serializer.data)
        return Response(serializer.data)

class LikedUsersForPhotoView(APIView):

    def get(self, request, id):

        liked_users = LikedUsers.objects.filter(photo_id=id)
        if liked_users:
                user_ids = liked_users.values_list('user_id', flat=True)
                return Response(user_ids, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)