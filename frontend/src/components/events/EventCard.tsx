

import React, { useState } from 'react'; // NEW: useState for small busy guard
import { Link } from 'react-router-dom';
import type { Event } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDateTime, getEventTypeIcon, truncateText } from '../../utils/helpers';
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyDollarIcon,
  EyeIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: number) => void;
  showActions?: boolean;
  isRegistering?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRegister,
  showActions = true,
  isRegistering = false,
}) => {
  // NEW: tiny guard to avoid double-clicks
  const [isBusy, setIsBusy] = useState(false);

  // NEW: confirm + call parent onRegister
  const handleRegister = async () => {
    if (!onRegister) return;
    if (isBusy) return;
    const ok = window.confirm(`Are you sure you want to register for "${event.title}"?`);
    if (!ok) return;

    try {
      setIsBusy(true);
      await onRegister(event.id); // uses your existing prop, unchanged
    } finally {
      setIsBusy(false);
    }
  };

  const getVariantFromStatus = (
    status: string
  ): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
    const map: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
      approved: 'success',
      pending: 'warning',
      rejected: 'danger',
      cancelled: 'danger',
      completed: 'info',
      confirmed: 'success',
    };
    return map[status] || 'default';
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden hover:shadow-md transition-shadow">
      {event.poster ? (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={
              event.poster.startsWith('http')
                ? event.poster
                : `http://127.0.0.1:8000${event.poster}`
            }
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      <div className="p-6">
        {/* header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getEventTypeIcon(event.event_type)}</span>
            <Badge variant={getVariantFromStatus(event.status)}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
          <Badge variant="info" size="sm">
            {event.event_level.replace('_', ' ')}
          </Badge>
        </div>

        {/* title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          <Link
            to={`/events/${event.id}`}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {event.title}
          </Link>
        </h3>

        {/* description */}
        <p className="text-gray-700 dark:text-gray-200 text-sm mb-4">
          {truncateText(event.description, 140)}
        </p>

        {/* meta */}
        <div className="space-y-2 mb-5 text-sm">
          <div className="flex items-center text-gray-800 dark:text-gray-100">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            {formatDateTime(event.start_date)}
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-100">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            {event.venue}
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-100">
            <UsersIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            {event.available_slots} / {event.max_participants ?? '—'} slots available
          </div>
          {event.is_paid_event && (
            <div className="flex items-center text-gray-800 dark:text-gray-100">
              <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Rs. {event.registration_fee}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-600 dark:text-gray-300">Organized by: {event.organizer_name}</div>

        {/* ACTION BAR — high-contrast CTAs */}
        {showActions && (
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* View Details: outlined, bold text */}
              <Link to={`/events/${event.id}`} className="w-full">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-center font-semibold border border-gray-300 dark:border-neutral-600 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                >
                  <EyeIcon className="h-5 w-5 mr-2" />
                  View Details
                </Button>
              </Link>

              {/* Register: solid, primary */}
              {/** NEW: hide register button for class-level events to match backend */}
              {onRegister &&
                event.is_registration_open &&
                event.status === 'approved' &&
                event.event_level !== 'class' && (
                  <Button
                    onClick={handleRegister} // NEW
                    loading={isRegistering || isBusy} // NEW: combine existing + local guard
                    size="md"
                    className="w-full justify-center font-semibold shadow-sm hover:shadow-md"
                  >
                    <TicketIcon className="h-5 w-5 mr-2" />
                    Register
                  </Button>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};