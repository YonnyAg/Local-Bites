from django.db import models

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
    place_id = models.CharField(max_length=100, verbose_name="Google Place ID", unique=True, null=True, blank=True)  # Nuevo campo

    def __str__(self):
        return self.name


