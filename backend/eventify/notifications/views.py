from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
# Create your views here.
 
class NotificationListView(generics.ListAPIView):
    serializer_class=NotificationSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')
    

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def mark_notification_read(request, pk: int):
    """
    Mark a single notification as read for the current user.
    Only the recipient can mark their notification as read.
    """
    notif = get_object_or_404(Notification, pk=pk, recipient=request.user)
    if not notif.is_read:
        notif.is_read = True
        notif.save(update_fields=["is_read"])
    return Response({"id": notif.id, "is_read": notif.is_read}, status=status.HTTP_200_OK)
    