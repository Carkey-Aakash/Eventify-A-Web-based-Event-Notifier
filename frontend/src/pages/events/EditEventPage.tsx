

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { EventForm } from '../../components/events/EventForm';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// Convert API ISO to "YYYY-MM-DDTHH:mm" for datetime-local input
const formatDateTimeForInput = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const EditEventPage: React.FC = () => { // ✅ named export (Vite needs this)
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await eventService.getEvent(Number(id));

        const formattedEvent = {
          ...data,
          start_date: formatDateTimeForInput(data.start_date),
          end_date: formatDateTimeForInput(data.end_date),
          registration_deadline: data.registration_deadline
            ? formatDateTimeForInput(data.registration_deadline)
            : '',
          max_participants: Number(data.max_participants) || 100,
          registration_fee: Number(data.registration_fee) || 0,
          is_paid_event: Boolean(data.is_paid_event),
          year: data.year ? String(data.year) : '',
          semester: data.semester ? String(data.semester) : '',
        };

        setEvent(formattedEvent);
      } catch (error: any) {
        console.error('Failed to load event:', error);
        toast.error('Failed to load event');
        navigate('/events');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) loadEvent();
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsSaving(true);

    try {
      // Dates already normalized in EventForm; just trim optionals here.
      const cleanData = {
        ...data,
        registration_deadline: data.registration_deadline?.trim() || undefined,
        class_name: data.class_name?.trim() || undefined,
        year: data.year?.trim() || undefined,
        semester: data.semester?.trim() || undefined,
      };

      await eventService.updateEvent(Number(id), cleanData);
      toast.success('Event updated successfully!');
      navigate(`/events/${id}`);
    } catch (error: any) {
      console.error('Update error:', error);
      let errorMessage = 'Failed to update event';

      if (error?.response?.data) {
        const errorData = error.response.data;
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (typeof errorData === 'object') {
          const fieldErrors = Object.entries(errorData)
            .map(([field, messages]) => {
              if (Array.isArray(messages)) return `${field}: ${messages.join(', ')}`;
              return `${field}: ${messages}`;
            })
            .join('; ');
          if (fieldErrors) errorMessage = fieldErrors;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6 text-center">
        <div className="text-lg text-red-600">Event not found</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Event</h1>
        <Link
          to={`/events/${id}`}
          className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-gray-200"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Event
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-neutral-800 px-6 py-4">
          <CalendarDaysIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Update event details
          </h2>
        </div>
        <div className="p-6">
          <EventForm
            onSubmit={handleSubmit}
            isLoading={isSaving}
            initialData={event}
          />
        </div>
      </div>
    </div>
  );
};