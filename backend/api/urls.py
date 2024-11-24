from django.urls import path
from .views import register_user, RestauranteListView, RestauranteDetail, login_view, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('register/', register_user, name='register_user'),
    path('login/', login_view, name='login'),  # Ruta para la vista login_view
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('google-reviews/<int:restaurante_id>/', views.google_reviews, name='google_reviews'),
    path('restaurantes/', RestauranteListView.as_view(), name='restaurante-list'),
    path('restaurante/<int:id>/', RestauranteDetail.as_view(), name='restaurante-detail'),
]

