from django.db import models
from django.contrib.auth.models import User


# Create your models here.



class Quote(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    submitted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null = True, blank=True)


class FavouriteQuote(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    quote = models.ForeignKey(Quote, on_delete=models.CASCADE)

