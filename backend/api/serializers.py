from rest_framework import serializers
from .models import Restaurante, FoodType

class FoodTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodType
        fields = '__all__'

class RestauranteSerializer(serializers.ModelSerializer):
    # Este campo maneja las relaciones de clave primaria (IDs)
    food_types = serializers.PrimaryKeyRelatedField(
        many=True,  # Permite múltiples relaciones
        queryset=FoodType.objects.all()
    )
    # Este campo es solo para lectura, para devolver los nombres de los tipos de comida
    food_types_names = serializers.StringRelatedField(
        many=True, 
        source='food_types'
    )

    class Meta:
        model = Restaurante
        fields = '__all__'
