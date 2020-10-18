from django.contrib import admin
from django.urls import include, path
from backend import views
from django.conf.urls import url

urlpatterns = [
    path('api/photos/', views.getImage),
    #path('api/photos/', views.annotateImage),
    #path('', views.displayHomepage, name='homepage'),
    #path('photos/', views.displayHomepage, name='homepage'),
    url(r'^api/photos/(?P<uuid>[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$', views.annotateImage),
]