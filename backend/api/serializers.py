from rest_framework import serializers
from .models import Restaurante

class RestauranteSerializer(serializers.ModelSerializer):
    food_types = serializers.StringRelatedField(many=True)  # Mostrar los nombres de los tipos de comida

    class Meta:
        model = Restaurante
        fields = '__all__'
