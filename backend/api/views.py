from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Restaurante
from .serializers import RestauranteSerializer
import requests
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.conf import settings

@api_view(['POST'])
def register_user(request):
    # Obtener los datos del request
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    # Verificar que el username no exista ya
    if User.objects.filter(email=email).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Crear el usuario
    user = User.objects.create(
        username=email,
        first_name=username,
        password=make_password(password),  # Hashea la contraseña
        email=email
    )

    # Retornar una respuesta exitosa
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

def google_reviews(request, restaurante_id):
    # Busca el restaurante por su ID
    restaurante = get_object_or_404(Restaurante, id=restaurante_id)

    # Usa el place_id almacenado en la base de datos
    place_id = restaurante.place_id
    if not place_id:
        return JsonResponse({"error": "El restaurante no tiene un Google Place ID"}, status=400)

    # Llama a la API de Google
    api_key = settings.GOOGLE_MAPS_API_KEY
    url = f'https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,rating,reviews&language=es&key={api_key}'

    response = requests.get(url)
    data = response.json()
    return JsonResponse(data)

class RestauranteListView(APIView):
    def get(self, request):
        restaurantes = Restaurante.objects.all()
        serializer = RestauranteSerializer(restaurantes, many=True)
        return Response(serializer.data)
    
class RestauranteDetail(APIView):
    def get(self, request, id):
        try:
            restaurante = Restaurante.objects.get(id=id)
            serializer = RestauranteSerializer(restaurante)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Restaurante.DoesNotExist:
            return Response({"error": "Restaurante no encontrado"}, status=status.HTTP_404_NOT_FOUND)

