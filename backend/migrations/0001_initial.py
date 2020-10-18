# Generated by Django 3.1.2 on 2020-10-03 04:57

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('theme', models.CharField(max_length=50)),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Date-Time')),
                ('image', models.FileField(upload_to='')),
                ('flagged', models.BooleanField(default=False)),
                ('tagged', models.BooleanField(default=False)),
            ],
        ),
    ]
