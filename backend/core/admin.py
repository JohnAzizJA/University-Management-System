from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'role', 'is_first_login', 'date_joined']
    list_filter = ['role', 'is_first_login', 'is_staff', 'is_active']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'student_id', 'employee_id']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('User Type', {'fields': ('role',)}),
        ('Student Info', {'fields': ('student_id', 'enrollment_year')}),
        ('Staff Info', {'fields': ('employee_id', 'department', 'hire_date')}),
        ('Additional Info', {'fields': ('phone_number', 'profile_picture', 'is_first_login', 'password_changed_at')}),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('User Type', {'fields': ('role',)}),
        ('Student Info', {'fields': ('student_id', 'enrollment_year')}),
        ('Staff Info', {'fields': ('employee_id', 'department', 'hire_date')}),
    )