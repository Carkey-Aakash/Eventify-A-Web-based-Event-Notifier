
# notifications/tasks.py
from celery import shared_task
from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from django.db.models import Q
from events.models import Event, EventRegistration
from users.models import User
from notifications.utils import create_notification, send_email_notification
from notifications.models import ReminderSent


LEAD_MINUTES = 60            # send 1 hour before
TOLERANCE_MINUTES = 1        # ±1 minute window (with beat every minute)

def _fmt_dt(dt):
    if not dt:
        return ""
    dt_local = timezone.localtime(dt)
    return dt_local.strftime("%b %d, %Y • %I:%M %p")

def _event_register_url(event_id: int) -> str:
    base = f"http://{getattr(settings, 'SITE_DOMAIN', 'localhost:8000')}".rstrip("/")
    return f"{base}/api/v1/events/{event_id}/register/"

def _eligible_students_for_event(event: Event):
    """Replicates your audience scope rules."""
    if event.event_level == 'college':
        return User.objects.filter(role='Student')

    if event.event_level == 'organization':
        return User.objects.filter(role='Student', organization=event.organizer.organization)

    if event.event_level == 'department':
        return User.objects.filter(role='Student', department=event.organizer.department)

    if event.event_level == 'class':
        year_str = str(event.year) if event.year is not None else None
        semester_str = str(event.semester) if event.semester is not None else None
        q = Q(role='Student') & Q(profile__isnull=False) & Q(profile__class_name=event.class_name)
        if year_str is not None and semester_str is not None:
            q &= ((Q(profile__year=year_str) & Q(profile__year__isnull=False)) |
                  (Q(profile__semester=semester_str) & Q(profile__semester__isnull=False)))
        elif year_str is not None:
            q &= Q(profile__year=year_str) & Q(profile__year__isnull=False)
        elif semester_str is not None:
            q &= Q(profile__semester=semester_str) & Q(profile__semester__isnull=False)
        else:
            q = Q(pk__in=[])  # empty
        return User.objects.filter(q)

    return User.objects.none()


@shared_task
def send_registration_closing_reminders():
    now = timezone.now()
    window_start = now + timedelta(minutes=LEAD_MINUTES)
    window_end = window_start + timedelta(minutes=TOLERANCE_MINUTES)

    # Only approved events whose registration deadline is ~60 minutes from now
    events = Event.objects.filter(
        status='approved',
        registration_deadline__gte=window_start,
        registration_deadline__lt=window_end,
    )

    for event in events:
        students = _eligible_students_for_event(event)

        for student in students:
            # de-dup
            if ReminderSent.objects.filter(
                student=student,
                event=event,
                reminder_type='registration_closing'
            ).exists():
                continue

            start = _fmt_dt(event.start_date)
            end = _fmt_dt(event.end_date)
            title = f"⏰ Registration Closing Soon: {event.title}"
            message = (
                f"Registration for **{event.title}** closes in ~1 hour.\n\n"
                f"📍 Venue: {event.venue}\n"
                f"🕒 Time: {start} → {end}\n\n"
                f"Register here if you are authenticated if not login first then register.The link is: {_event_register_url(event.id)}"
            )

            create_notification(
                recipient=student,
                title=title,
                message=message,
                notification_type='reminder',
                event=event,
            )

            if student.email:
                send_email_notification(student.email, title, message)

            ReminderSent.objects.create(
                student=student,
                event=event,
                reminder_type='registration_closing'
            )


@shared_task
def send_event_start_reminders():
    now = timezone.now()
    window_start = now + timedelta(minutes=LEAD_MINUTES)
    window_end = window_start + timedelta(minutes=TOLERANCE_MINUTES)

    # Only approved events whose start is ~60 minutes from now
    events = Event.objects.filter(
        status='approved',
        start_date__gte=window_start,
        start_date__lt=window_end,
    )

    for event in events:
        regs = EventRegistration.objects.filter(event=event, status='confirmed').select_related('student')
        for reg in regs:
            # de-dup
            if ReminderSent.objects.filter(
                student=reg.student,
                event=event,
                reminder_type='event_start'
            ).exists():
                continue

            start = _fmt_dt(event.start_date)
            end = _fmt_dt(event.end_date)
            title = f"🚀 Starting in ~1 hour: {event.title}"
            message = (
                f"The event **{event.title}** starts in ~1 hour.\n\n"
                f"📍 Venue: {event.venue}\n"
                f"🕒 Time: {start} → {end}\n\n"
            )

            create_notification(
                recipient=reg.student,
                title=title,
                message=message,
                notification_type='reminder',
                event=event,
            )

            if reg.student.email:
                send_email_notification(reg.student.email, title, message)

            ReminderSent.objects.create(
                student=reg.student,
                event=event,
                reminder_type='event_start'
            )
