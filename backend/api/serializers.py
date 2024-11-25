from rest_framework import serializers
from .models import Restaurante, FoodType

class RestauranteSerializer(serializers.ModelSerializer):
    food_types = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=FoodType.objects.all()
    )
    food_types_names = serializers.StringRelatedField(many=True, source='food_types')

    class Meta:
        model = Restaurante
        fields = '__all__'
