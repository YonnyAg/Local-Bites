from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

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