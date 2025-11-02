# backend/core/urls.py
from django.urls import path
from .views import RegisterAPIView, MyTokenObtainPairView, CurrentUserAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', CurrentUserAPIView.as_view(), name='current_user'),
]
