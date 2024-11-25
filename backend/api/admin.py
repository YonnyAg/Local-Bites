from django.contrib import admin
from .models import Restaurante, FoodType, SocialMedia

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

@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ('restaurante', 'instagram', 'facebook', 'whatsapp')  # Campos que se mostrarán en el panel
    search_fields = ('restaurante__name', 'instagram', 'facebook')  # Campos por los que se puede buscar
    list_filter = ('restaurante',)  # Filtros por restaurante