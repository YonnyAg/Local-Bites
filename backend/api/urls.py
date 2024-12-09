from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # ------------------------ USER ------------------------------
    path('register/', views.register_user, name='register_user'), #URL to regiser user
    path('login/', views.login_view, name='login'), #URL to login user
    path('profile/', views.user_profile, name='user_profile'), #URL to view profile.
    path('profile/update/', views.update_profile, name='update_profile'), #URL to update profile user
    path('comments/', views.user_comments, name='user_comments'), #URL to view comments on profile user
    # ------------------------------------------------------------

    # ------------------------ TOKEN ------------------------------
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #URL to see the access and refresh token
    path('token/pair/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), #URL to see the access token and refresh to validate if it is superuser or not.
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #URL to obtain the refresh token
    # -------------------------------------------------------------

    # ------------------------ Restaurant ------------------------------
    path('restaurantes/', views.RestauranteListView.as_view(), name='restaurante-list'), #URL to get 
    # ------------------------------------------------------------------
    path('google-reviews/<int:restaurante_id>/', views.google_reviews, name='google_reviews'),
    path('api/comments/<int:restaurant_id>/', views.comments_by_restaurant, name='comments_by_restaurant'),
    path('restaurantes/add/', views.add_restaurant, name='add_restaurant'),
    path('restaurantes/<int:pk>/delete/', views.delete_restaurant, name='delete_restaurant'),
    path('food_types/', views.get_food_types, name='get_food_types'),
    path('restaurante/<int:id>/', views.RestauranteDetail.as_view(), name='restaurante-detail'),
    path('api/contact/', views.contact_message_view, name='contact_message'),
    path('api/contact/<int:id>/', views.contact_message_view),
    path('api/csrf/', views.csrf_token_view, name='csrf_token'),
    path('restaurantes/<int:id>/', views.RestauranteDetail.as_view(), name='restaurante-detail'),

    # ------------------------ ANALYRICS ------------------------------
    path('traffic_analytics/', views.traffic_analytics, name='traffic_analytics'), #URL to view traffic in differnt pages (urls)
    path('user_analytics/', views.user_analytics, name='user_analytics'), #URL to view the reviews of registered users on the site
    # -----------------------------------------------------------------
]

