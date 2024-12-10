from rest_framework import serializers
from .models import Restaurante, FoodType, SocialMedia, Comment

class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ['instagram', 'facebook', 'whatsapp']  # Campos que deseas incluir


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
    # Serializador para redes sociales (si existe)
    social_media = SocialMediaSerializer(many=True, read_only=True)
    # Campo para devolver la URL completa de la imagen
    image = serializers.SerializerMethodField()

    class Meta:
        model = Restaurante
        fields = '__all__'

    def create(self, validated_data):
        # Extraemos y asignamos los `food_types` correctamente
        food_types_data = validated_data.pop('food_types', [])
        restaurante = Restaurante.objects.create(**validated_data)
        restaurante.food_types.set(food_types_data)
        return restaurante

    def get_image(self, obj):
        # Devuelve la URL completa de la imagen desde Cloudinary
        if obj.image:
            return obj.image.url  # Esto generará la URL completa
        return None

class FoodTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodType
        fields = ['id', 'name']

class CommentSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'restaurant_name', 'text', 'rating', 'created_at']


