from django.db import models
import uuid

# Create your models here.
class Image(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False,
    )
    theme = models.CharField(max_length=50)
    date = models.DateTimeField("Date-Time", auto_now_add=True)
    url = models.CharField(max_length=255)
    flagged = models.BooleanField(default=False)
    tagged = models.BooleanField(default=False)

    
    