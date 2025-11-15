from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.code})"
    
class User(AbstractUser):
    ROLE_CHOICES = [
        ('ADMIN', 'Admin'),
        ('STUDENT', 'Student'),
        ('STAFF', 'Staff'),
        ('PARENT', 'Parent'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='STUDENT')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    
    # Student-specific fields
    student_id = models.CharField(max_length=20, unique=True, null=True, blank=True)
    enrollment_year = models.IntegerField(null=True, blank=True)

    # Staff-specific fields (professor, TA, admin_staff)
    employee_id = models.CharField(max_length=20, unique=True, null=True, blank=True)
    hire_date = models.DateField(null=True, blank=True)
    
    # Password management
    is_first_login = models.BooleanField(default=True)
    password_changed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.username} ({self.role})"
    
    class Meta:
        ordering = ['-date_joined']