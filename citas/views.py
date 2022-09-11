from .models import Citas
from .serializer import CitaSerializer
from rest_framework import generics


class CitasListCreate(generics.ListCreateAPIView):
    queryset = Citas.objects.all().order_by('-creado_en')  # Updated
    serializer_class = CitaSerializer
