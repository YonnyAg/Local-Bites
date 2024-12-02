from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Restaurante, FoodType, ContactMessage, Profile as Profile_user_model, Comment, Restaurante
from .serializers import RestauranteSerializer, FoodTypeSerializer, SocialMedia, SocialMediaSerializer, CommentSerializer
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
from rest_framework.permissions import IsAuthenticated

def csrf_token_view(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

@api_view(['POST'])
def register_user(request):
    # Obtener los datos del request
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    # Verificar que el email no exista ya
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Crear el usuario
    user = User.objects.create(
        username=email,
        first_name=username,
        password=make_password(password),  # Hashea la contraseña
        email=email
    )

    # Crear el perfil del usuario
    Profile_user_model.objects.create(user=user)

    # Retornar una respuesta exitosa
    return Response({"message": "User and profile created successfully"}, status=status.HTTP_201_CREATED)

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

#PROFILE LOGIN
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Profile, Comment

@api_view(['GET'])
def user_profile(request):
    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    user = request.user
    profile = Profile.objects.get(user=user)
    profile_picture = profile.profile_picture.url if profile.profile_picture else None

    comments = Comment.objects.filter(user=user).select_related('restaurant')
    comments_data = [
        {
            "restaurant": comment.restaurant.name,
            "text": comment.text,
            "rating": comment.rating,
            "created_at": comment.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for comment in comments
    ]

    profile_data = {
        "username": user.first_name,
        "email": user.username,
        "profilePicture": profile_picture,
        "comments": comments_data,
    }
    return Response(profile_data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # Solo usuarios autenticados pueden acceder
def user_comments(request):
    if request.method == 'GET':
        # Obtener los comentarios del usuario autenticado
        comments = Comment.objects.filter(user=request.user)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=200)

    elif request.method == 'POST':
        # Crear un nuevo comentario
        data = request.data
        try:
            restaurant = Restaurante.objects.get(id=data.get('restaurant_id'))
            new_comment = Comment.objects.create(
                user=request.user,
                restaurant=restaurant,
                text=data.get('text'),
                rating=data.get('rating'),
            )
            return Response(CommentSerializer(new_comment).data, status=201)
        except Restaurante.DoesNotExist:
            return Response({'error': 'Restaurant not found'}, status=404)



@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])  # Permitir archivos y datos de formulario
def update_profile(request):
    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=401)
    
    user = request.user
    profile = user.profile  # Obtener el perfil relacionado
    
    # Actualizar nombre de usuario
    username = request.data.get('username')
    if username:
        user.first_name = username
        user.save()

    # Actualizar imagen de perfil
    profile_picture = request.FILES.get('profilePicture')
    if profile_picture:
        profile.profile_picture = profile_picture
        profile.save()

    # Retornar los datos actualizados
    profile_data = {
        "username": user.first_name,
        "email": user.email,
        "profilePicture": profile.profile_picture.url if profile.profile_picture else None,
    }

    return Response(profile_data, status=200)


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

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
def comments_by_restaurant(request, restaurant_id):
    try:
        comments = Comment.objects.filter(restaurant__id=restaurant_id)
        data = [
            {
                "id": comment.id,
                "user": {
                    "username": comment.user.username,
                    "profile_picture": comment.user.profile.profile_picture.url if comment.user.profile.profile_picture else None,
                },
                "text": comment.text,
                "rating": comment.rating,
                "created_at": comment.created_at,
            }
            for comment in comments
        ]
        return Response(data, status=200)
    except Restaurante.DoesNotExist:
        return Response({"error": "Restaurant not found"}, status=404)


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
        serializer = FoodTypeSerializer(food_types, many=True)  # Usamos el serializer específico
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

            # Obtener redes sociales asociadas
            social_media = SocialMedia.objects.filter(restaurante=restaurante)
            social_media_serializer = SocialMediaSerializer(social_media, many=True)

            # Combinar los datos del restaurante y las redes sociales
            response_data = serializer.data
            response_data['social_media'] = social_media_serializer.data

            return Response(response_data, status=status.HTTP_200_OK)
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

