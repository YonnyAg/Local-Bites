from django.db import models
from django.contrib.auth.models import User

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

class Comment(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="User"
    )
    restaurant = models.ForeignKey(
        Restaurante,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="Restaurant"
    )
    text = models.TextField(max_length=1000, verbose_name="Comment Text")
    rating = models.DecimalField(max_digits=2, decimal_places=1, verbose_name="Rating")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")

    def __str__(self):
        return f"Comment by {self.user.username} on {self.restaurant.name}"





