
from rest_framework import serializers
from .models import Citas


class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citas
        fields = '__all__'
        # fields = ['id', 'autor', 'mensaje']
        # ordering = ['creado_en']
