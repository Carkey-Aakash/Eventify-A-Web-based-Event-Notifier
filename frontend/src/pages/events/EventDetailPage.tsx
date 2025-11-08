
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import type { Event } from '../../types';
import { EventDetails } from '../../components/events/EventDetails';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const data = await eventService.getEvent(parseInt(id));
        setEvent(data);
      } catch (error: any) {
        console.error('Event fetch error:', error);
        toast.error('Failed to load event details');
        navigate('/events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleRegister = async () => {
    if (!event || !user) return;
    
    setIsRegistering(true);
    try {
      const res = await eventService.registerForEvent(event.id);
      // prefer backend message if present
      toast.success(res?.message || 'Registration successful!');
      // Refresh event data
      const updatedEvent = await eventService.getEvent(event.id);
      setEvent(updatedEvent);
    } catch (error: any) {
      // NEW: read backend text first, then e.message, then fallback
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (typeof error?.message === 'string' ? error.message : 'Registration failed'); // NEW
      toast.error(msg); // NEW
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCancel = async () => {
    if (!event) return;
    
    try {
      const res = await eventService.cancelRegistration(event.id);
      toast.success(res?.message || 'Registration cancelled'); // NEW: use backend text when present
      // Refresh event data
      const updatedEvent = await eventService.getEvent(event.id);
      setEvent(updatedEvent);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (typeof error?.message === 'string' ? error.message : 'Cancellation failed'); // NEW
      toast.error(msg); // NEW
    }
  };

  const handleApprove = async (status: string, comments?: string) => {
    if (!event) return;
    
    setIsApproving(true);
    try {
      await eventService.approveRejectEvent(event.id, status, comments);
      toast.success(`Event ${status} successfully`);
      // Refresh event data
      const updatedEvent = await eventService.getEvent(event.id);
      setEvent(updatedEvent);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (typeof error?.message === 'string' ? error.message : 'Action failed'); // NEW
      toast.error(msg); // NEW
    } finally {
      setIsApproving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!event || !user) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Event not found</h3>
        <p className="text-gray-500">The event you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EventDetails
        event={event}
        user={user}
        onRegister={handleRegister}
        onCancel={handleCancel}
        onApprove={handleApprove}
        isRegistering={isRegistering}
        isApproving={isApproving}
      />
    </div>
  );
};
