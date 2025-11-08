import React, { useEffect, useState } from 'react';
import { eventService } from '../../services/eventService';
import type { Event } from '../../types';
import { EventCard } from '../../components/events/EventCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const CompletedEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await eventService.getCompletedEvents();
        setEvents(data);
      } catch (error) {
        console.error('Completed events fetch error:', error);
        toast.error('Failed to load completed events');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Completed Events</h1>
        <p className="mt-2 text-gray-600">All events marked as completed</p>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} showActions={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <CheckBadgeIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No completed events</h3>
          <p className="text-gray-500">Nothing has been completed yet.</p>
        </div>
      )}
    </div>
  );
};