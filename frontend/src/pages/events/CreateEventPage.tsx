// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { eventService } from '../../services/eventService';
// import { EventForm } from '../../components/events/EventForm';
// import toast from 'react-hot-toast';

// export const CreateEventPage: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (data: any) => {
//     setIsLoading(true);
//     try {
//       const event = await eventService.createEvent(data);
//       toast.success('Event created successfully!');
//       navigate(`/events/${event.id}`);
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || 
//                           Object.values(error.response?.data || {}).flat().join(', ') ||
//                           'Failed to create event';
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
//         <p className="mt-2 text-gray-600">
//           Fill in the details below to create your event
//         </p>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <EventForm
//           onSubmit={handleSubmit}
//           isLoading={isLoading}
//         />
//       </div>
//     </div>
//   );
// };
// frontend/src/pages/events/CreateEventPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { EventForm } from '../../components/events/EventForm';
import toast from 'react-hot-toast';
import {
  ArrowLeftIcon,
  SparklesIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

export const CreateEventPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const event = await eventService.createEvent(data);
      toast.success('Event created successfully!');
      navigate(`/events/${event.id}`);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        Object.values(error?.response?.data || {}).flat().join(', ') ||
        'Failed to create event';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Top hero */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
        {/* subtle glow */}
        <div className="pointer-events-none absolute -inset-1 opacity-20 blur-3xl" />
        <div className="flex items-start justify-between p-6 md:p-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
                Organizer Tools
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Create a New Event
            </h1>
            <p className="max-w-2xl text-white/85">
              Set up the details, schedule, and audience. We’ll handle registrations,
              notifications, and attendance.
            </p>
            {/* Step badges (decorative) */}
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/20">1 · Details</span>
              <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/20">2 · Scheduling</span>
              <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/20">3 · Registration</span>
              <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/20">4 · Review</span>
            </div>
          </div>

          <Link
            to="/events"
            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/20 transition hover:bg-white/20"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Events
          </Link>
        </div>

        {/* callout about class-level */}
        <div className="border-t border-white/15 bg-white/10 px-6 py-3 text-sm md:px-8">
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="h-5 w-5" />
            <p>
              <span className="font-semibold">Heads up:</span>{' '}
              For <span className="font-semibold">Class-level</span> events, registration is not required and
              <span className="font-semibold"> registration deadline is optional</span>. Students can attend directly.
            </p>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form card */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-neutral-800 px-6 py-4">
              <CalendarDaysIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Event setup
              </h2>
            </div>
            <div className="p-6">
              <EventForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Helpful sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-6 h-fit space-y-6">
          {/* Tips */}
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pro tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Use a clear, action-oriented title (e.g., “AI/ML Bootcamp — Hands-on”).</li>
              <li>• Add a concise description with outcomes and prerequisites.</li>
              <li>• Double-check start / end times and the venue capacity.</li>
              <li>• For paid events, set a realistic fee and deadline.</li>
              <li>• Upload a poster to boost engagement (optional).</li>
            </ul>
          </div>

          {/* Policy / rules */}
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
            <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Quick rules</div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><span className="font-medium">Class-level:</span> No registration needed; deadline optional.</p>
              <p><span className="font-medium">Department / Org / College:</span> Registration deadline required.</p>
              <p>Conflicts (venue/time) are auto-detected during creation.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
