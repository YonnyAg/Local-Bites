from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.
class FoodType(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Food Type")

    def __str__(self):
        return self.name

class Restaurante(models.Model):
    LOCATIONS = [
        ('lanco', 'Lanco'),
        ('mariquina', 'Mariquina'),
    ]

    name = models.CharField(max_length=100, verbose_name="Name")
    description = models.TextField(verbose_name="Description")
    rating = models.DecimalField(max_digits=3, decimal_places=1, verbose_name="Rating")
    location = models.CharField(max_length=50, choices=LOCATIONS, verbose_name="Location")
    food_types = models.ManyToManyField(FoodType, related_name="restaurantes", verbose_name="Food Types")
    phone = models.CharField(max_length=15, verbose_name="Phone", null=True, blank=True)
    exact_location = models.CharField(max_length=200, verbose_name="Exact Location", null=True, blank=True)
    place_id = models.CharField(max_length=100, verbose_name="Google Place ID", unique=True, null=True, blank=True)
    image = models.ImageField(upload_to='restaurant_images/', verbose_name="Image", null=True, blank=True)  # Nuevo campo para imágenes

    def __str__(self):
        return self.name
    
class SocialMedia(models.Model):
    restaurante = models.ForeignKey(
        Restaurante, 
        on_delete=models.CASCADE, 
        related_name="social_media",
        verbose_name="Restaurante"
    )
    instagram = models.URLField(max_length=255, verbose_name="Instagram", null=True, blank=True)
    facebook = models.URLField(max_length=255, verbose_name="Facebook", null=True, blank=True)
    whatsapp = models.URLField(max_length=255, verbose_name="WhatsApp", null=True, blank=True)

    def __str__(self):
        return f"Redes Sociales de {self.restaurante.name}"

    class Meta:
        verbose_name = "Red Social"
        verbose_name_plural = "Redes Sociales"

class ContactMessage(models.Model):
    LOCATION_CHOICES = [
        ('Lanco', 'Lanco'),
        ('Mariquina', 'Mariquina'),
    ]
    MOTIVE_CHOICES = [
        ('contacto', 'Contacto'),
        ('sugerencia', 'Sugerencia'),
        ('agregar_local', 'Agregar Local'),
    ]

    nombre = models.CharField(max_length=50, verbose_name="Nombre")
    apellido = models.CharField(max_length=50, verbose_name="Apellido")
    correo_electronico = models.EmailField(verbose_name="Correo Electrónico")
    ubicacion = models.CharField(max_length=50, choices=LOCATION_CHOICES, verbose_name="Ubicación")
    motivo = models.CharField(max_length=20, choices=MOTIVE_CHOICES, verbose_name="Motivo")
    mensaje = models.TextField(max_length=1000, verbose_name="Mensaje")
    fecha_envio = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Envío")

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.get_motivo_display()}"

    class Meta:
        verbose_name = "Mensaje de Contacto"
        verbose_name_plural = "Mensajes de Contacto"

# PROFILE USER
class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile"
    )
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        null=True,
        blank=True,
        verbose_name="Profile Picture"
    )

    def __str__(self):
        return f"Profile of {self.user.username}"

def validate_rating(value):
    """Valida que la calificación esté entre 1 y 5."""
    if value < 1 or value > 5:
        raise ValidationError('Rating must be between 1 and 5.')

class Comment(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="User"
    )
    restaurant = models.ForeignKey(
        'Restaurante',  # Usa el nombre del modelo como string para evitar conflictos de importación
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="Restaurant"
    )
    text = models.TextField(max_length=1000, verbose_name="Comment Text")
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        verbose_name="Rating",
        validators=[validate_rating]  # Aplica la validación personalizada
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")  # Campo opcional para registrar ediciones

    def __str__(self):
        return f"Comment by {self.user.username} on {self.restaurant.name}"

    def stars(self):
        """Genera una representación visual de las estrellas."""
        return '★' * int(self.rating) + '☆' * (5 - int(self.rating))

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
        ordering = ['-created_at'] 

# MODELO FOR ANALYTICS
import re
from django.core.exceptions import ObjectDoesNotExist
from django.db import models

class TrafficRecord(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    url = models.URLField(max_length=500)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True, null=True)
    restaurant = models.ForeignKey('Restaurante', null=True, blank=True, on_delete=models.SET_NULL)

    # Diccionario para las URLs estáticas
    URL_MAPPINGS = {
        "https://local-bites-sepia.vercel.app/": "Home",
        "https://local-bites-sepia.vercel.app/locales": "Locales",
        "https://local-bites-sepia.vercel.app/contacto": "Contacto",
        "https://local-bites-sepia.vercel.app/perfi": "Perfil",
        "https://local-bites-sepia.vercel.app/login": "Login",
    }

    def save(self, *args, **kwargs):
        # Primero, maneja las URLs estáticas usando el diccionario
        if self.url in self.URL_MAPPINGS:
            self.restaurant = None  # No hay restaurante asociado para estas URLs

        # Maneja las URLs dinámicas para restaurantes
        elif "restaurante/" in self.url:
            try:
                # Extrae el ID del restaurante de la URL
                restaurant_id = re.search(r'restaurante/(\d+)', self.url).group(1)
                self.restaurant = Restaurante.objects.get(id=restaurant_id)
            except (AttributeError, ObjectDoesNotExist):
                self.restaurant = None  # Si no encuentra un ID válido, no asocia nada

        # Si no coincide con nada conocido, guarda como está
        super().save(*args, **kwargs)

    def get_friendly_name(self):
        # Devuelve un nombre amigable para mostrar
        if self.url in self.URL_MAPPINGS:
            return self.URL_MAPPINGS[self.url]
        if self.restaurant:
            return self.restaurant.name




