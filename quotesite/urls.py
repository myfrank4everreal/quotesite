from django.contrib import admin
from django.urls import path, include
from quoteapp.views import FrontendAppView, QuoteListCreateAPIView


from rest_framework_simplejwt.views import TokenObtainPairView

# for the jwt authentication setup
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('quoteapp.urls')),  # Include quoteapp API endpoints
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # allows login to backend
    path('', FrontendAppView.as_view(), name='frontend'),  # Serve React frontend

    # path('api/quotes/', QuoteListCreateAPIView.as_view(), name='quotes'),


]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
