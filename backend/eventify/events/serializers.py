from rest_framework import serializers
from django.utils import timezone
from .models import Event, EventRegistration, EventFeedback, EventConflict
from users.serializers import UserProfileSerializer


class EventSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source='organizer.username', read_only=True)
    approved_by_name = serializers.CharField(source='approved_by.username', read_only=True)
    registered_count = serializers.SerializerMethodField()
    available_slots = serializers.SerializerMethodField()
    is_registration_open = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['organizer', 'approved_by', 'status', 'qr_code', 'created_at', 'updated_at']

    def get_registered_count(self, obj):
        return obj.get_registered_count()

    def get_available_slots(self, obj):
        return obj.get_available_slots()

    def get_is_registration_open(self, obj):
        return obj.is_registration_open()

    # def validate(self, attrs):


    #     now = timezone.now()

    #     if attrs.get('start_date') and attrs['start_date'] < now:
    #         raise serializers.ValidationError("Start date cannot be in the past.")

    #     if attrs.get('end_date') and attrs['end_date'] < now:
    #         raise serializers.ValidationError("End date cannot be in the past.")

    #     if attrs.get('registration_deadline') and attrs['registration_deadline'] < now:
    #         raise serializers.ValidationError("Registration deadline cannot be in the past.")

    #     if attrs.get('start_date') and attrs.get('end_date'):
    #         if attrs['start_date'] >= attrs['end_date']:
    #             raise serializers.ValidationError("Start date must be before end date")

    #     if attrs.get('registration_deadline') and attrs.get('start_date'):
    #         if attrs['registration_deadline'] >= attrs['start_date']:
    #             raise serializers.ValidationError("Registration deadline must be before event start date")
            
    

    #     return attrs



    def validate(self, data):
        event_level = data.get('event_level')
        now = timezone.now()

        if data.get('start_date') and data['start_date'] < now:
            raise serializers.ValidationError({
                "start_date": "Start date cannot be in the past."
            })

        if data.get('end_date') and data['end_date'] < now:
            raise serializers.ValidationError({
                "end_date": "End date cannot be in the past."
            })

        if data.get('registration_deadline') and data['registration_deadline'] < now:
            raise serializers.ValidationError({
                "registration_deadline": "Registration deadline cannot be in the past."
            })

        # ✅ MISSING RULE (add this)
        if data.get('start_date') and data.get('end_date'):
            if data['start_date'] >= data['end_date']:
                raise serializers.ValidationError({
                    "start_date": "Start date must be before end date."
                })

        # (optional parity with EventSerializer)
        if data.get('registration_deadline') and data.get('start_date'):
            if data['registration_deadline'] >= data['start_date']:
                raise serializers.ValidationError({
                    "registration_deadline": "Registration deadline must be before event start date."
                })

        if event_level == 'class':
            if not data.get('class_name'):
                raise serializers.ValidationError({
                    "class_name": "Class name is required for class-level events."
                })
            if not data.get('year') and not data.get('semester'):
                raise serializers.ValidationError({
                    "year/semester": "Provide either year or semester for class-level events."
                })
        else:
            if not data.get('registration_deadline'):
                raise serializers.ValidationError({
                    "registration_deadline": "Registration deadline is required for non class-level events."
                })

        return data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')
        user = getattr(request, 'user', None)

        # hide QR for non-organizers/admins
        allowed = False
        if user and user.is_authenticated:
            if hasattr(user, 'is_admin_user') and user.is_admin_user():
                allowed = True
            elif instance.organizer_id == user.id:
                allowed = True
        if not allowed:
            data.pop('qr_code', None)
            data.pop('qr_code_data', None)

        # 🔹 Add student-specific registration info so the frontend can show feedback button
        if user and user.is_authenticated and hasattr(user, 'is_student') and user.is_student():
            reg = instance.registrations.filter(student=user).first()
            if reg:
                data['registration_status'] = reg.status
                data['attended'] = reg.attended
                data['feedback_given'] = reg.feedback_given

        return data

class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'title', 'description', 'event_level', 'event_type',
            'start_date', 'class_name', 'year', 'semester',
            'end_date', 'venue', 'max_participants', 'registration_deadline',
            'is_paid_event', 'registration_fee', 'poster'
        ]

    # def validate(self, data):
    #     event_level = data.get('event_level')

    #     if event_level == 'class':
    #         # class_name is always required
    #         if not data.get('class_name'):
    #             raise serializers.ValidationError({
    #                 "class_name": "Class name is required for class-level events."
    #             })

    #         # Require either year or semester (at least one)
    #         if not data.get('year') and not data.get('semester'):
    #             raise serializers.ValidationError({
    #                 "year/semester": "Provide either year or semester for class-level events."
    #             })

    #     return data


    def validate(self, data):
        event_level = data.get('event_level')
        now = timezone.now()



        if data.get('start_date') and data['start_date'] < now:
            raise serializers.ValidationError({
                "start_date": "Start date cannot be in the past."
            })

        if data.get('end_date') and data['end_date'] < now:
            raise serializers.ValidationError({
                "end_date": "End date cannot be in the past."
            })

        if data.get('registration_deadline') and data['registration_deadline'] < now:
            raise serializers.ValidationError({
                "registration_deadline": "Registration deadline cannot be in the past."
            })
        
        if data.get('start_date') and data.get('end_date'):
            if data['start_date'] >= data['end_date']:
                raise serializers.ValidationError({"start_date": "Start date must be before end date."})

        if data.get('registration_deadline') and data.get('start_date'):
            if data['registration_deadline'] >= data['start_date']:
                raise serializers.ValidationError({"registration_deadline": "Registration deadline must be before event start date."})


        if event_level == 'class':
            # class_name required
            if not data.get('class_name'):
                raise serializers.ValidationError({
                    "class_name": "Class name is required for class-level events."
                })
            # Need year or semester
            if not data.get('year') and not data.get('semester'):
                raise serializers.ValidationError({
                    "year/semester": "Provide either year or semester for class-level events."
                })
            # registration_deadline is OPTIONAL for class-level → no requirement here

        else:
            # For non-class levels, registration_deadline is REQUIRED
            if not data.get('registration_deadline'):
                raise serializers.ValidationError({
                    "registration_deadline": "Registration deadline is required for non class-level events."
                })

        return data

    def create(self, validated_data):
        validated_data['organizer'] = self.context['request'].user
        return super().create(validated_data)


class EventRegistrationSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)
    student_name = serializers.CharField(source='student.username', read_only=True)

    class Meta:
        model = EventRegistration
        fields = [
            'id', 'event', 'event_title', 'student_name',
            'registration_date', 'status', 'payment_status',
            'attended', 'feedback_given'
        ]
        read_only_fields = ['student', 'registration_date', 'attended', 'feedback_given']


class EventFeedbackSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='Student.username', read_only=True)
    event_title = serializers.CharField(source='event.title', read_only=True)

    class Meta:
        model = EventFeedback
        fields = [
            'id', 'event', 'event_title', 'student_name', 'rating',
            'content_quality_rating', 'organization_rating', 'comments',
            'suggestions', 'would_recommend', 'created_at'
        ]
        read_only_fields = ['student', 'registration', 'created_at', 'event']

    def create(self, validated_data):
        # Get extra data passed from serializer.save()
        student = self.context['student']
        registration = self.context['registration']
        event = self.context['event']

        # Create Feedback manually
        feedback = EventFeedback.objects.create(
            Student=student,
            registration=registration,
            event=event,
            **validated_data
        )
        return feedback


class EventApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['status', 'status_comments']

    def validate_status(self, value):
        if value not in ['approved', 'rejected', 'cancelled']:
            raise serializers.ValidationError("Status must be either 'approved' or 'rejected' or 'cancelled' ")
        return value

    def validate(self, attrs):
        status = attrs.get('status')
        comments = attrs.get('status_comments')

        if status in ['rejected', 'cancelled'] and not comments:
            raise serializers.ValidationError({
                'status_comments': "Rejection comment is required when status is 'rejected'."
            })
        return attrs


class EventConflictSerializer(serializers.ModelSerializer):
    event1_title = serializers.CharField(source='event1.title', read_only=True)
    event2_title = serializers.CharField(source='event2.title', read_only=True)

    class Meta:
        model = EventConflict
        fields = '__all__'
