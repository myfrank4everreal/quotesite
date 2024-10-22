from django.db import models
from django.contrib.auth.models import User



# ***************Signals setup***********************
#  this code allows automatic role management 
# in your Django application, ensuring that when a user is created, 
# they are automatically added to the "Regular User" group. You can
# then define group-specific permissions using Django’s permission 
# system, so users in this group only have access to certain features 
# (like viewing and posting quotes, but not admin actions 

from django.contrib.auth.models import Group, Permission
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType



@receiver(post_save, sender=User)
def assign_user_role(sender, instance, created, **kwargs):
    if created:
        group = Group.objects.get(name='Regular User')  # default group
        instance.groups.add(group)


        if group.name == 'Author':
            content_type = ContentType.objects.get_for_model(Quote)
            permissions = Permission.objects.filter(content_type=content_type)
            instance.user_permissions.add(*permissions)



# ***********************************




class Quote(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=200, blank=True, null=True)
    submitted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null = True, blank=True)

    def __str__(self):
        return f"{self.text}"  # Returning the first 50 characters of the quote text

class FavouriteQuote(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    quote = models.ForeignKey(Quote, on_delete=models.CASCADE)

