from django.contrib import admin
from .models import Restaurante, FoodType

# Register your models here.
@admin.register(FoodType)
class FoodTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Restaurante)
class RestauranteAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'location')
    search_fields = ('name', 'description')
    list_filter = ('location', 'food_types')
    filter_horizontal = ('food_types',)