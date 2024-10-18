from django.urls import path
from .views import quote_list, quote_detail, add_favorite, remove_favorite, register
from django.contrib.auth import views as auth_views



urlpatterns = [
 # this is for the custom django template render
    path('login/', auth_views.LoginView.as_view(template_name='quoteapp/registration/login.html'), name='login'),


    # authentications
    # path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', register, name='register'),


   
    path('', quote_list, name='quote_list'),
    path('quote/<int:quote_id>/', quote_detail, name='quote_detail'),
    path('quote/<int:quote_id>/favorite/', add_favorite, name='add_favorite'),
    path('quote/<int:quote_id>/unfavorite/', remove_favorite, name='remove_favorite'),
]
