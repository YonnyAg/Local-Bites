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

    def __str__(self):
        return self.name

