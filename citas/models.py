from django.db import models

# Create your models here.
class Citas(models.Model):
    autor = models.CharField(max_length=30)
    mensaje = models.CharField(max_length=500)
    creado_en = models.DateTimeField(auto_now_add=True)
