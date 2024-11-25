from rest_framework import serializers
from .models import Restaurante, FoodType

class FoodTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodType
        fields = '__all__'  # Incluye todos los campos de FoodType

class RestauranteSerializer(serializers.ModelSerializer):
    food_types = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=FoodType.objects.all()
    )
    food_types_names = serializers.StringRelatedField(many=True, source='food_types')

    class Meta:
        model = Restaurante
        fields = '__all__'
