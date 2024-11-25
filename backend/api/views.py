from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Restaurante, FoodType, ContactMessage
from .serializers import RestauranteSerializer
import requests
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
import json
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token


def csrf_token_view(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

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

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        # Generar los tokens usando SimpleJWT
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isSuperUser': user.is_superuser  # Aquí añadimos el estado de superusuario
        })

    return Response({'error': 'Credenciales inválidas'}, status=401)


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

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RestauranteSerializer

@api_view(['POST'])
def add_restaurant(request):
    serializer = RestauranteSerializer(data=request.data)
    if serializer.is_valid():
        restaurante = serializer.save()
        return Response(RestauranteSerializer(restaurante).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])

def delete_restaurant(request, pk):
    try:
        restaurant = Restaurante.objects.get(pk=pk)
        restaurant.delete()
        return Response({'message': 'Restaurante eliminado exitosamente'}, status=status.HTTP_204_NO_CONTENT)
    except Restaurante.DoesNotExist:
        return Response({'error': 'Restaurante no encontrado'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_food_types(request):
    try:
        food_types = FoodType.objects.all()  # Obtenemos todos los tipos de comida
        serializer = RestauranteSerializer(food_types, many=True)  # Usamos el serializer específico
        return Response(serializer.data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


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
        
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Agregar información adicional al token
        token['isSuperUser'] = user.is_superuser

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Incluir el atributo isSuperUser en la respuesta
        data['isSuperUser'] = self.user.is_superuser
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@csrf_exempt  # Desactiva el CSRF para facilitar pruebas (no recomendado para producción)
def contact_message_view(request, id=None):
    if request.method == 'GET':
        # Devuelve todas las solicitudes de contacto
        messages = ContactMessage.objects.all()
        data = [
            {
                'id': message.id,
                'name': f"{message.nombre} {message.apellido}",
                'email': message.correo_electronico,
                'suggestion': message.mensaje,
                'read': False,  # Puedes cambiar esto según tu lógica
            }
            for message in messages
        ]
        return JsonResponse(data, safe=False)
    
    if request.method == 'POST':
        try:
            # Parsear el JSON de la solicitud
            data = json.loads(request.body)
            
            # Crear un nuevo mensaje de contacto
            contact_message = ContactMessage.objects.create(
                nombre=data.get('nombre'),
                apellido=data.get('apellido'),
                correo_electronico=data.get('correo'),
                ubicacion=data.get('ubicacion'),
                motivo=data.get('motivo'),
                mensaje=data.get('mensaje')
            )
            # Retornar respuesta exitosa
            return JsonResponse({'message': 'Mensaje enviado exitosamente'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    if request.method == 'DELETE':
        if not id:
            return JsonResponse({'error': 'ID de mensaje requerido para eliminar'}, status=400)
        try:
            # Intentar obtener y eliminar el mensaje
            message = ContactMessage.objects.get(id=id)
            message.delete()
            return JsonResponse({'message': 'Mensaje eliminado correctamente'}, status=200)
        except ContactMessage.DoesNotExist:
            return JsonResponse({'error': 'Mensaje no encontrado'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)



