from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.schemas import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include('api.urls')),
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_jwt_token),
    path('accounts/', include('rest_registration.api.urls')),
]
