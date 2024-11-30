from django.apps import AppConfig

class ApiConfig(AppConfig):  # Cambia `ApiConfig` por el nombre de tu aplicación
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'  # Cambia 'api' por el nombre de tu aplicación

    def ready(self):
        import api.signals  # Importa el archivo signals.py
