# backend/core/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    # allow client to include role and optional department when registering
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, required=False, default='STUDENT')
    department_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'password2', 'role', 'department_id')
        extra_kwargs = {'email': {'required': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # Remove fields not on the User model and handle password
        dept_id = validated_data.pop('department_id', None)
        role = validated_data.pop('role', None)
        validated_data.pop('password2', None)
        password = validated_data.pop('password')
        user = User(**validated_data)
        if role:
            user.role = role
        if dept_id:
            try:
                from .models import Department
                user.department = Department.objects.get(id=dept_id)
            except Exception:
                # ignore invalid department, leave null
                pass
        user.set_password(password)
        user.save()
        return user

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User._meta.get_field('department').related_model
        fields = ('id', 'name', 'code')


class UserSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'department', 'phone', 'address')

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])