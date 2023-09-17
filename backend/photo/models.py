from django.db import models


from users.models import UserAccount



class Album(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    thumbnail = models.CharField(max_length=200)
    likes = models.IntegerField(default=0)
    user = models.ForeignKey(UserAccount,on_delete=models.CASCADE, related_name='useralbums')



class Photo(models.Model):

    caption = models.CharField(max_length=255)
    likes = models.IntegerField(default=0)
    photo = models.URLField(max_length=200)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='photos')
    likedUsers = models.ManyToManyField('LikedUsers', related_name='liked_photos', default=[])

class LikedUsers(models.Model):

    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)



class AlbumManager(models.Manager):
    def create_album(self, title, description, thumbnail, user_account):
            if not title or not description or not thumbnail:
                raise ValueError('Album must have a title, description, and thumbnail')
            album = self.model(
                title=title,
                description=description,
                thumbnail=thumbnail,
                user= user_account
            )
            album.save(using=self._db)
            return album

class PhotoManager(models.Manager):
     def create_photo(self, caption, likes, photo, album ):
          if not caption or not photo:
               raise ValueError('Photo must have title and photo ')
          newPhoto = self.model(
               caption = caption,
               likes = likes,
               photo = photo,
               album = album
          )
          newPhoto.save(using=self._db)
          return newPhoto