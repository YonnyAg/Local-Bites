from django.contrib import admin
from .models import Restaurante, FoodType, SocialMedia, Profile, Comment, TrafficRecord

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

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture')  # Campos visibles en la lista
    search_fields = ('user__username', 'user__email')  # Opciones de búsqueda

# Clase personalizada para el modelo Comment
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'restaurant', 'rating', 'created_at')  # Campos que se mostrarán en la lista
    list_filter = ('rating', 'created_at')  # Filtros en la barra lateral
    search_fields = ('user__username', 'restaurant__name', 'text')  # Campos para la búsqueda
    ordering = ('-created_at',)  # Ordenar por la fecha de creación (más reciente primero)
    readonly_fields = ('created_at',)  # Campo de solo lectura
    
@admin.register(TrafficRecord)
class TrafficRecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'url', 'user_agent', 'timestamp')  # Columnas a mostrar
    list_filter = ('timestamp', 'url')  # Filtros laterales por fecha y URL
    search_fields = ('url', 'user_agent')  # Campo de búsqueda
    ordering = ('-timestamp',)  # Orden descendente por fecha
    actions = ['delete_selected']  # Habilitar acción de eliminar

    def delete_selected(self, request, queryset):
        queryset.delete()
        self.message_user(request, "Los registros seleccionados han sido eliminados.")
    delete_selected.short_description = "Eliminar registros seleccionados"
