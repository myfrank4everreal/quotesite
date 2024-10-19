from django.urls import path
from .views import QuoteListCreateAPIView, QuoteDetailAPIView

urlpatterns = [
    # API endpoints for quotes
    path('quotes/', QuoteListCreateAPIView.as_view(), name='quote_list_create'),
    path('quotes/<int:pk>/', QuoteDetailAPIView.as_view(), name='quote_detail'),
]
