from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

# Escucha la señal post_save del modelo User
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:  # Si se creó un nuevo usuario
        print(f"Creating profile for user: {instance.username}")
        Profile.objects.create(user=instance)  # Crea un perfil para ese usuario
