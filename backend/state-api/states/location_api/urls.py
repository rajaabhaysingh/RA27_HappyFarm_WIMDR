from django.urls import path, include
from django.conf.urls import url
from django.contrib.auth import urls
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from . import views
from django.conf.urls.static import static
from django.conf import settings

general_router = DefaultRouter()
general_router.register(r'', views.StateViews, 'places')

urlpatterns = [
    path('', include(general_router.urls)),
]
