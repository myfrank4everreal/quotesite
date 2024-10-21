from django.contrib import admin
from django.urls import path, include
from quoteapp.views import FrontendAppView


# for the jwt authentication setup
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('quoteapp.urls')),  # Include quoteapp API endpoints
    path('', FrontendAppView.as_view(), name='frontend'),  # Serve React frontend
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
