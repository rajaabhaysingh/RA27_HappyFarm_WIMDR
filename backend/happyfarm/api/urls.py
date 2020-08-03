from django.urls import path, include
from django.conf.urls import url
from django.contrib.auth import urls
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from . import views
from django.conf.urls.static import static
from django.conf import settings

general_router = DefaultRouter()
general_router.register(r'user', views.CustomUserViews, 'user')
general_router.register(r'item', views.ItemViews, 'item')
general_router.register(r'category', views.ItemCategoryViews, 'category')
general_router.register(
    r'top_carousel', views.TopCarouselViews, 'top_carousel')
general_router.register(
    r'ad_category', views.AdCategoryDataViews, 'ad_category')
general_router.register(r'ad_data', views.AdDataViews, 'ad_data')

my_router = DefaultRouter()
my_router.register(r'item', views.myItemViews, 'item')
my_router.register(r'cart', views.CartViews, 'cart')
my_router.register(r'cartitem', views.myCartItemsView, 'cartitem')
my_router.register(r'transaction', views.myTransactionViews, 'transaction')
my_router.register(r'connection', views.myConnectionsView, 'connection')
my_router.register(r'item_images', views.myItemImagesViews, 'item_images')
my_router.register(r'address', views.myAddressViews, 'address')
my_router.register(r'id-proof', views.myIdProofViews, 'id-proof')

phone_router = DefaultRouter()
phone_router.register(
    r'register_phone', views.registerFromPhoneView, 'register_phone')

urlpatterns = [
    path('', include(general_router.urls)),
    path('my/', include(my_router.urls)),
    path('phone/', include(phone_router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
