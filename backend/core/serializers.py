from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 
            'user_type', 'phone_number', 'student_id', 'employee_id',
            'department', 'enrollment_year', 'hire_date', 'is_first_login'
        )
        read_only_fields = ('id', 'is_first_login')
        
class AdminCreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = (
            'username', 'email', 'password', 'first_name', 'last_name',
            'user_type', 'phone_number', 'student_id', 'employee_id',
            'department', 'enrollment_year', 'hire_date'
        )
        
    def validate(self, attrs):
        user_type = attrs.get('user_type')
        
        # Validate student-specific fields
        if user_type == 'student':
            if not attrs.get('student_id'):
                raise serializers.ValidationError({
                    'student_id': 'Student ID is required for student accounts.'
                })
            if not attrs.get('enrollment_year'):
                raise serializers.ValidationError({
                    'enrollment_year': 'Enrollment year is required for student accounts.'
                })
        
        # Validate staff-specific fields
        if user_type in ['professor', 'ta', 'staff']:
            if not attrs.get('employee_id'):
                raise serializers.ValidationError({
                    'employee_id': 'Employee ID is required for staff accounts.'
                })
            if not attrs.get('hire_date'):
                raise serializers.ValidationError({
                    'hire_date': 'Hire date is required for staff accounts.'
                })
            if not attrs.get('department'):
                raise serializers.ValidationError({
                    'department': 'Department is required for staff accounts.'
                })
        
        return attrs
    
    def create(self, validated_data):
        # Generate default password if not provided
        password = validated_data.pop('password', None)
        if not password:
            # Default password: username + "123"
            password = f"{validated_data['username']}123"
        
        user = User.objects.create_user(
            password=password,
            is_first_login=True,
            **validated_data
        )
        
        return user
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(
        required=True, 
        write_only=True,
        validators=[validate_password]
    )
    new_password_confirm = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({
                'new_password_confirm': 'Passwords do not match.'
            })
        return attrs
    
class FirstLoginPasswordChangeSerializer(serializers.Serializer):
    """Used when user logs in for the first time"""
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password]
    )
    new_password_confirm = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({
                'new_password_confirm': 'Passwords do not match.'
            })
        return attrs