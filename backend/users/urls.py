from django.urls import path
from .views import ChangeForgottenPassWordView, ChangePassWordView, GetProfileView, RegisterView, RetrieveUserView, ResetPasswordView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieveUserView.as_view()),
    path('get-profile', GetProfileView.as_view()),
    path('send-password', ResetPasswordView.as_view()),
    path('forgotten-password', ChangeForgottenPassWordView.as_view()),
    path('change-password', ChangePassWordView.as_view())

]