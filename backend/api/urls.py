from django.urls import path
from .views import register_user, RestauranteListView, RestauranteDetail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('register/', register_user, name='register_user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('google-reviews/', views.google_reviews, name='google_reviews'),
    path('restaurantes/', RestauranteListView.as_view(), name='restaurante-list'),
    path('restaurante/<int:id>/', RestauranteDetail.as_view(), name='restaurante-detail'),
]

