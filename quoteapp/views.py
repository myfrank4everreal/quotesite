from django.views.generic import TemplateView
from rest_framework import generics, permissions
from .models import Quote
from .serializers import QuoteSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import Group

# Serves the React app's index.html file for the frontend
class FrontendAppView(TemplateView):
    template_name = 'index.html'


# Custom permission to only allow authors or admins to modify quotes.
class IsAuthorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name='Admin').exists():
            return True
        if request.user.groups.filter(name='Author').exists():
            return request.method in ['POST', 'PUT', 'DELETE']
        return request.method in ['POST']


# API view to list and create quotes
class QuoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrAdmin]  # Apply the custom permission


# API view to retrieve, update, and delete a quote
class QuoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrAdmin]
