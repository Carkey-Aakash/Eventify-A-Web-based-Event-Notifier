import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import type { Event } from '../../types';
import { EventCard } from '../../components/events/EventCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const MyEventsPage: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const data = await eventService.getMyEvents();
        setEvents(data);
      } catch (error) {
        console.error('My events fetch error:', error);
        toast.error('Failed to load your events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const handleCancel = async (eventId: number) => {
    try {
      await eventService.cancelRegistration(eventId);
      toast.success('Registration cancelled');
      // Refresh events
      const data = await eventService.getMyEvents();
      setEvents(data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Cancellation failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const canCreateEvent = user?.role === 'Department' || user?.role === 'Organization';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="mt-2 text-gray-600">
            {user?.role === 'Student' 
              ? 'Events you have registered for'
              : 'Events you have organized'
            }
          </p>
        </div>
        
        {canCreateEvent && (
                    <Link to="/events/create">
                      <Button
                        className="inline-flex items-center gap-2 rounded-full
                                   bg-gradient-to-r from-indigo-600 to-violet-600
                                   px-4 py-2 text-white font-semibold tracking-wide
                                   shadow-lg hover:from-indigo-500 hover:to-violet-500
                                   active:from-indigo-700 active:to-violet-700
                                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                                   focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                      >
                        <PlusIcon className="h-5 w-5" />
                        <span>Create Event</span>
                      </Button>
                    </Link>
                  )}
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="relative">
              <EventCard
                event={event}
                showActions={false}
              />
              
              {/* Additional info for students */}
              {user?.role === 'Student' && (
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    {event.registration_status && (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.registration_status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        event.registration_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.registration_status}
                      </span>
                    )}
                    {event.attended && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Attended
                      </span>
                    )}
                    {event.feedback_given && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Feedback Given
                      </span>
                    )}
                  </div>
                  
                  {event.registration_status === 'confirmed' && !event.attended && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancel(event.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">📅</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">
            {user?.role === 'Student' 
              ? "You haven't registered for any events yet."
              : "You haven't created any events yet."
            }
          </p>
          {canCreateEvent && (
            <Link to="/events/create">
              <Button>Create Your First Event</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};