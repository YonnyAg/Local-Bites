#Python libraries
import json
import requests
# -----------------------------------

#Third party libraries
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils.timezone import now, timedelta
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework import status
from rest_framework.decorators import (api_view, parser_classes,
                                       permission_classes)
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from cloudinary.uploader import upload
# -----------------------------------

#Internal project libraries
from .models import Comment, ContactMessage, FoodType
from .models import Restaurante, TrafficRecord, Comment, Profile
from .serializers import (CommentSerializer, FoodTypeSerializer,
                          RestauranteSerializer, SocialMedia,
                          SocialMediaSerializer)
# -----------------------------------

def csrf_token_view(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

import logging
logger = logging.getLogger('django')

@api_view(['POST'])
def register_user(request):
    try:
        # Validar datos antes de crear usuario
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        print("Datos recibidos:", request.data)

        if not username:
            return Response({"error": "El nombre de usuario es obligatorio"}, status=status.HTTP_400_BAD_REQUEST)
        if not email:
            return Response({"error": "El email es obligatorio"}, status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({"error": "La contraseña es obligatoria"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "El email ya está registrado"}, status=status.HTTP_400_BAD_REQUEST)

        # Crear usuario
        user = User.objects.create(
            username=email,  # Usando email como username
            first_name=username,
            password=make_password(password),
            email=email
        )

        # Verificar si ya existe un perfil
        if not Profile.objects.filter(user=user).exists():
            Profile.objects.create(user=user)
            print("Perfil creado para usuario:", user)
        else:
            print("El usuario ya tiene un perfil asignado.")

        return Response({"message": "Usuario creado correctamente"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(f"Error durante el registro: {e}")
        return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
@api_view(['GET'])
def user_profile(request):
    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    user = request.user
    profile = Profile.objects.get(user=user)
    profile_picture = profile.profile_picture if profile.profile_picture else None

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
        # Subir la imagen a Cloudinary
        try:
            upload_result = upload(profile_picture, folder="profile_pictures/")
            profile.profile_picture = upload_result.get("secure_url")  # Guardar la URL
            profile.save()
        except Exception as e:
            return Response({"error": f"Error uploading to Cloudinary: {str(e)}"}, status=500)

    # Retornar los datos actualizados
    profile_data = {
        "username": user.first_name,
        "email": user.email,
        "profilePicture": profile.profile_picture,  # Devolvemos la URL de la imagen
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

@api_view(['GET'])
def comments_by_restaurant(request, restaurant_id):
    try:
        comments = Comment.objects.filter(restaurant__id=restaurant_id)
        data = [
            {
                "id": comment.id,
                "user": {
                    "username": comment.user.username,
                    "first_name": comment.user.first_name,  # Añade el first_name aquí
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

# VIEWS FOR ANALYTICS
#traffic urls
from django.db.models import Count
from django.http import JsonResponse
from django.utils.timezone import now
from datetime import timedelta
@csrf_exempt
def traffic_analytics(request):
    if request.method == 'POST':
        # Registrar nuevos datos
        data = json.loads(request.body)
        url = data.get('url')
        user_agent = data.get('user_agent')
        if url:  # Evitar guardar URLs vacías
            TrafficRecord.objects.create(url=url, user_agent=user_agent)

        return JsonResponse({"message": "Log registrado exitosamente"}, status=201)

    elif request.method == 'GET':
        # Analizar datos existentes
        today = now().date()
        last_week = today - timedelta(days=7)

        # Agrupar visitas por día y URL, excluyendo URLs vacías
        daily_traffic = (
            TrafficRecord.objects.filter(timestamp__date__gte=last_week)
            .exclude(url__isnull=True)
            .exclude(url__exact="")
            .extra({"day": "date(timestamp)"})
            .values("day", "url")
            .annotate(visits=Count("id"))
            .order_by("day", "-visits")
        )

        # Agrupar visitas totales por URL, excluyendo URLs vacías
        total_traffic = (
            TrafficRecord.objects.exclude(url__isnull=True)
            .exclude(url__exact="")
            .values("url")
            .annotate(total_visits=Count("id"))
            .order_by("-total_visits")
        )

        # Añadir nombres amigables a las URLs
        formatted_daily_data = []
        for record in daily_traffic:
            url = record["url"]
            day = record["day"]
            visits = record["visits"]

            # Crear un objeto temporal para usar get_friendly_name
            traffic_record = TrafficRecord(url=url)
            friendly_name = traffic_record.get_friendly_name()

            if friendly_name:  # Solo incluir si tiene nombre amigable
                formatted_daily_data.append({
                    "day": day,
                    "url": url,
                    "friendly_name": friendly_name,
                    "visits": visits,
                })

        # Formatear los datos totales
        formatted_total_data = []
        for record in total_traffic:
            url = record["url"]
            visits = record["total_visits"]

            # Crear un objeto temporal para usar get_friendly_name
            traffic_record = TrafficRecord(url=url)
            friendly_name = traffic_record.get_friendly_name()

            if friendly_name:  # Solo incluir si tiene nombre amigable
                formatted_total_data.append({
                    "url": url,
                    "friendly_name": friendly_name,
                    "total_visits": visits,
                })

        # Combinar los datos en una respuesta
        response_data = {
            "daily_traffic": formatted_daily_data,
            "total_traffic": formatted_total_data,
        }

        return JsonResponse(response_data, safe=False)

    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)



#user analytics registers
def user_analytics(request):
    today = now().date()
    last_week = today - timedelta(days=6)
    # Usuarios registrados por día en la última semana
    weekly_data = []
    for i in range(7):
        day = today - timedelta(days=i)
        count = User.objects.filter(date_joined__date=day).count()
        weekly_data.append({
            "date": day.strftime("%Y-%m-%d"),
            "registrations": count,
        })

    return JsonResponse({
        "total_users": User.objects.count(),
        "this_week": User.objects.filter(date_joined__date__gte=last_week).count(),
        "weekly_data": weekly_data[::-1]  # Reversa para mostrar en orden cronológico
    })



