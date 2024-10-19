from django.views.generic import TemplateView
from rest_framework import generics
from .models import Quote
from .serializers import QuoteSerializer

# Serves the React app's index.html file for the frontend
class FrontendAppView(TemplateView):
    template_name = 'index.html'

# API to get and create quotes
class QuoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

# API to retrieve, update, and delete individual quotes
class QuoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
