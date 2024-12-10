from pathlib import Path
import os
from decouple import config
import cloudinary

# Configuración Base
BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET_KEY y DEBUG
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = [
    'local-bites-backend.onrender.com',
    'localhost',
    '127.0.0.1'
]

GOOGLE_MAPS_API_KEY = config('GOOGLE_MAPS_API_KEY')

# Aplicaciones Instaladas
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'cloudinary',
    'cloudinary_storage',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
]

# Middlewares
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Configuración de URLs
ROOT_URLCONF = 'backend.urls'

# Configuración de Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Configuración de WSGI
WSGI_APPLICATION = 'backend.wsgi.application'

# Base de Datos
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT', default='3306'),
    }
}

# Configuración de REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# Validadores de Contraseña
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Configuración Internacional
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Configuración de Archivos Estáticos
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Configuración de WhiteNoise para Archivos Estáticos
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Configuración explícita de Cloudinary
CLOUDINARY_URL = config('CLOUDINARY_URL', default=None)
if CLOUDINARY_URL:
    # Extraer manualmente los valores de la URL
    from urllib.parse import urlparse

    parsed_url = urlparse(CLOUDINARY_URL)
    cloudinary.config(
        cloud_name=parsed_url.hostname.split('@')[-1],
        api_key=parsed_url.username,
        api_secret=parsed_url.password
    )
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
else:
    pass

# Configuración de CORS
CORS_ALLOWED_ORIGINS = [
    "https://local-bites-sepia.vercel.app",  # Dominio del frontend
    "http://localhost:5173",
    "https://localbites.cl",
]

CORS_ALLOW_CREDENTIALS = True

# Configuración de CSRF
CSRF_TRUSTED_ORIGINS = [
    "https://local-bites-sepia.vercel.app",  # Tu dominio de producción
    "http://localhost:5173",  # Frontend local
    "https://localbites.cl",
]

LOGIN_URL = 'https://localbites.cl/login'

# Configuración de Auto Fields
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
