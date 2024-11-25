from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_view, name='login'),  # Ruta para la vista login_view
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('google-reviews/<int:restaurante_id>/', views.google_reviews, name='google_reviews'),
    path('restaurantes/', views.RestauranteListView.as_view(), name='restaurante-list'),
    path('restaurantes/add/', views.add_restaurant, name='add_restaurant'),
    path('restaurantes/<int:pk>/delete/', views.delete_restaurant, name='delete_restaurant'),
    path('food_types/', views.get_food_types, name='get_food_types'),
    path('restaurante/<int:id>/', views.RestauranteDetail.as_view(), name='restaurante-detail'),
    path('api/contact/', views.contact_message_view, name='contact_message'),
    path('api/contact/<int:id>/', views.contact_message_view),  # Para DELETE
    path('api/csrf/', views.csrf_token_view, name='csrf_token'),
]

