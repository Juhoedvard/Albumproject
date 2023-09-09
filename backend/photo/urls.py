from django.urls import path

from photo.views import AddPhotosView, CreateAlbumView, GetAlbumsView, LikePhotoView, LikedUsersForPhotoView


urlpatterns = [
    path('albums', GetAlbumsView.as_view()),
    path('create-album', CreateAlbumView.as_view()),
    path('add-photos', AddPhotosView.as_view()),
    path('likephoto', LikePhotoView.as_view()),
    path('getPhotoLikes/<int:id>', LikedUsersForPhotoView.as_view())

]