from django.contrib import admin
from django.urls import path, include
from . import views  



urlpatterns = [
    path('receive_items/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.signup, name='signup'),
    path('get_user/', views.getCurrUser, name='getuser'),
    path('csrf/', views.get_csrf),
]