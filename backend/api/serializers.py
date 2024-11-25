from rest_framework import serializers
from .models import Restaurante, FoodType

class RestauranteSerializer(serializers.ModelSerializer):
    # Usamos un campo para devolver solo los IDs de los food_types
    food_types = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=FoodType.objects.all()
    )
    # Usamos otro campo para devolver los nombres de los food_types (si es necesario)
    food_types_names = serializers.StringRelatedField(
        many=True,
        source='food_types',
        read_only=True
    )

    class Meta:
        model = Restaurante
        fields = '__all__'

    def create(self, validated_data):
        # Extraemos y asignamos los `food_types` correctamente
        food_types_data = validated_data.pop('food_types', [])
        restaurante = Restaurante.objects.create(**validated_data)
        restaurante.food_types.set(food_types_data)
        return restaurante

class FoodTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodType
        fields = ['id', 'name']
