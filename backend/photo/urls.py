from django.urls import path


from photo.views import AddPhotosView, CreateAlbumView, GetAlbumsView, LikePhotoView, LikedUsersForPhotoView, RemoveAlbumView, RemovePhotoFromAlbum, EditPhotoView, GetAlbumPhotos


urlpatterns = [
    path('albums', GetAlbumsView.as_view()),
    path('create-album', CreateAlbumView.as_view()),
    path('add-photos', AddPhotosView.as_view()),
    path('likephoto', LikePhotoView.as_view()),
    path('getPhotoLikes', LikedUsersForPhotoView.as_view()),
    path('removealbum', RemoveAlbumView.as_view()),
    path('remove-photo-album', RemovePhotoFromAlbum.as_view()),
    path('editPhoto', EditPhotoView.as_view()),
    path('getAlbumPhotos', GetAlbumPhotos.as_view()),

]