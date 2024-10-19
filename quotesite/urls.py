from django.contrib import admin
from django.urls import path, include
from quoteapp.views import FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('quoteapp.urls')),  # Include quoteapp API endpoints
    path('', FrontendAppView.as_view(), name='frontend'),  # Serve React frontend
]
