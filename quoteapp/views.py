from django.views.generic import TemplateView

from rest_framework import generics, permissions
from .models import Quote
from .serializers import QuoteSerializer

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import Group
# Serves the React app's index.html file for the frontend
class FrontendAppView(TemplateView):
    template_name = 'index.html'

# API to get and create quotes
# class QuoteListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Quote.objects.all()
#     serializer_class = QuoteSerializer


# API to retrieve, update, and delete individual quotes
# class QuoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Quote.objects.all()
#     serializer_class = QuoteSerializer


# this is the update function to take of delegating roles to users
def get_permissions(self):
    if self.request.method == 'POST':
        return [IsAuthenticated(), IsAdminUser()] #only admin can create quotes
    
    return [IsAuthenticated()]


# Updating the QuoteListCreateAPIView and QuoteDetailAPIView

class IsAuthorOrAdmin(permissions.BasePermission):

   
    # Custom permission to only allow authors or admins to 
    # modify quotes.
    
    def has_permission(self, request, view):
        if request.user.group.filter(name='Admin').exist():
            return True
        if request.user.group.filter(name='Author').exist():
            return request.method in ['POST', 'PUT', 'DELETE']
        return request.method in ['GET']
    

class QuoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrAdmin]  # Apply the custom permission


class QuoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrAdmin]


# IsAuthorOrAdmin: Custom permission that checks if the user belongs to either the Admin or Author group.
# QuoteListCreateAPIView and QuoteDetailAPIView: These now use the IsAuthorOrAdmin permission class.