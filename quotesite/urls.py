from django.contrib import admin
from django.urls import path, include
from quoteapp.views import FrontendAppView, MyLoginView


# for the jwt authentication setup
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('quoteapp.urls')),  # Include quoteapp API endpoints
    path('api/login/',MyLoginView.as_view(), name='login'),  # Ensure this path matches your frontend call
    path('', FrontendAppView.as_view(), name='frontend'),  # Serve React frontend
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
