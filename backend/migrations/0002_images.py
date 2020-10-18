# Generated by Django 3.1.2 on 2020-10-03 04:58

from django.db import migrations

def create_data(apps, schema_editor):
    Image = apps.get_model('backend', 'Image')
    Image(uuid="5c6b5fd8-e953-4784-b696-64ebc57a0c76", theme="Nature", image="00000000", flagged=False, tagged=False).save()

class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
