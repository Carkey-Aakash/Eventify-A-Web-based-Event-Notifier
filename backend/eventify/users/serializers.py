from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User, Profile
import re

class AbsoluteURLImageField(serializers.ImageField):
    """Return an absolute URL for image fields."""
    def to_representation(self, value):
        url = super().to_representation(value)
        request = self.context.get("request")
        if url and request:
            return request.build_absolute_uri(url)
        return url


class UserRegistrationSerializer(serializers.ModelSerializer):
    # incoming from frontend
    password  = serializers.CharField(write_only=True, required=True)
    password1 = serializers.CharField(write_only=True, required=True)
    user_id   = serializers.ReadOnlyField(source='id')

    class Meta:
        model = User
        fields = [
            'user_id', 'username', 'email',
            'password', 'password1',
            'department', 'organization', 'gender',
            'student_id', 'phone_number', 'profile_picture',
        ]
        extra_kwargs = {
            'department':      {'required': False, 'allow_null': True, 'allow_blank': True},
            'organization':    {'required': False, 'allow_null': True, 'allow_blank': True},
            'gender':          {'required': False, 'allow_null': True, 'allow_blank': True},
            'student_id':      {'required': False, 'allow_null': True, 'allow_blank': True},
            'profile_picture': {'required': False, 'allow_null': True},
            'phone_number':    {'required': False, 'allow_null': True, 'allow_blank': True},
        }

    # ✅ Username must start with a letter; rest can be letters/numbers/underscore
    def validate_username(self, value: str):
        if not re.match(r'^[A-Za-z][A-Za-z0-9_]*$', value or ''):
            raise serializers.ValidationError(
                "Username must start with a letter and may contain letters, numbers, and underscores."
            )
        return value
    
    def validate_student_id(self, value):
        if value in (None, ''):
            return value  # still optional

        value = str(value).strip()
        # must be 5–7 digits only
        if not re.fullmatch(r'^\d{5,7}$', value):
            raise serializers.ValidationError(
                "Student ID must be 5 to 7 digits (numbers only)."
            )
        return value

    # ✅ Phone number: optional, but if provided must be exactly 10 digits
    def validate_phone_number(self, value):
        if value in (None, ''):
            return value  # still optional if you allowed null/blank

        value = str(value).strip()
        # Regex: must start with 97 or 98, followed by exactly 8 digits → total 10
        if not re.fullmatch(r'^(97|98)\d{8}$', value):
            raise serializers.ValidationError(
                "Phone number must be exactly 10 digits, start with 97 or 98, and contain only numbers."
            )
        return value
    

    def validate(self, attrs):
        """
        Enforce that Students must provide department and organization.
        (This endpoint always creates Students in create(), so we check unconditionally.)
        """
        dept = attrs.get('department')
        org  = attrs.get('organization')

        def is_empty(v):
            # Treat None / '' / whitespace-only as empty
            return v is None or (isinstance(v, str) and v.strip() == '')

        errors = {}

        # Require both for student registration
        if is_empty(dept):
            errors['department'] = "Department is required for student registration."
        if is_empty(org):
            errors['organization'] = "Organization is required for student registration."

        # Keep your existing password checks
        pwd  = attrs.get('password')
        pwd1 = attrs.get('password1')

        if pwd != pwd1:
            errors['password1'] = 'Passwords do not match.'
            errors['message']   = 'Passwords do not match.'

        if errors:
            # Stop early if field errors exist (don’t run strength check yet)
            raise serializers.ValidationError(errors)

        validate_password(pwd)
        return attrs

    def create(self, validated_data):
        validated_data.pop('password1', None)
        password = validated_data.pop('password')

        validated_data['role'] = 'Student'

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not (username and password):
            raise serializers.ValidationError({'message': 'Must include username and password'})

        user = authenticate(username=username, password=password)
        if not user:
            # normalize error key for frontend
            raise serializers.ValidationError({'message': 'Invalid username or password'})

        if not user.is_active:
            raise serializers.ValidationError({'message': 'User account is disabled'})

        attrs['user'] = user
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    profile_picture = AbsoluteURLImageField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email',
            'first_name', 'last_name', 'role',
            'department', 'organization', 'profile_picture','phone_number',
            'profile',
        ]

    def get_profile(self, obj):
        try:
            p = obj.profile
            return {
                'bio': p.bio,
                'class_name': p.class_name,
                'year': p.year,
                'semester': p.semester,
                'address': p.address,
                'interests': p.interests.split(',') if p.interests else []
            }
        except Profile.DoesNotExist:
            return None