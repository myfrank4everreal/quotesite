# Generated by Django 5.1.2 on 2024-10-21 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quoteapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quote',
            name='category',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]



# We need to create the groups that define the roles in our system. You can do 
# this via the Django admin panel, but we'll automate this process using a data 
# migration so that every time the system is deployed or initialized, the user
#  roles are automatically created.
# Adding a manually define the creation of the groups and permissions like this:


def create_groups(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Permission = apps.get_model('auth', 'Permission')
    ContentType = apps.get_model('contenttypes', 'ContentType')
    
    # Get the content type for the Quote model
    quote_content_type = ContentType.objects.get_for_model(apps.get_model('quoteapp', 'Quote'))

    # Define groups and permissions
    admin_group, _ = Group.objects.get_or_create(name='Admin')
    author_group, _ = Group.objects.get_or_create(name='Author')
    regular_group, _ = Group.objects.get_or_create(name='Regular User')

    # Get all permissions
    all_permissions = Permission.objects.all()

    # Assign all permissions to Admin
    admin_group.permissions.set(all_permissions)

    # Assign add, change, delete, and view quote permissions to Author
    author_permissions = Permission.objects.filter(content_type=quote_content_type).filter(codename__in=['add_quote', 'change_quote', 'delete_quote', 'view_quote'])
    author_group.permissions.set(author_permissions)

    # Assign only view quote permission to Regular User
    view_permission = Permission.objects.filter(content_type=quote_content_type, codename='view_quote')
    regular_group.permissions.set(view_permission)

def delete_groups(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Group.objects.filter(name__in=['Admin', 'Author', 'Regular User']).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('quoteapp', '0001_initial'),  # Update this to your last migration
    ]

    operations = [
        migrations.RunPython(create_groups, delete_groups),
]