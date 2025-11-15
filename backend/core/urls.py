# backend/core/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    AdminCreateUserView,
    UserListView,
    UserDetailView,
    CurrentUserProfileView,
    ChangePasswordView,
    FirstLoginPasswordChangeView,
    LogoutView,
)

app_name = 'core'

urlpatterns = [
    # Authentication
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    
    # Password Management
    path('auth/change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('auth/first-login-password-change/', FirstLoginPasswordChangeView.as_view(), name='first_login_password_change'),
    
    # User Management (Admin)
    path('users/create/', AdminCreateUserView.as_view(), name='admin_create_user'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    
    # Current User Profile
    path('profile/', CurrentUserProfileView.as_view(), name='current_user_profile'),
]