// // import React, { useEffect, useState } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import { eventService } from '../../services/eventService';
// // import { EventForm } from '../../components/events/EventForm';
// // import toast from 'react-hot-toast';
// // import { ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// // // Helper function to convert datetime to format expected by datetime-local input
// // const formatDateTimeForInput = (dateString: string): string => {
// //   if (!dateString) return '';
// //   // Remove timezone info and keep only YYYY-MM-DDTHH:mm format
// //   const date = new Date(dateString);
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   const hours = String(date.getHours()).padStart(2, '0');
// //   const minutes = String(date.getMinutes()).padStart(2, '0');
// //   return `${year}-${month}-${day}T${hours}:${minutes}`;
// // };

// // export const EditEventPage: React.FC = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const [event, setEvent] = useState<any>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const loadEvent = async () => {
// //       try {
// //         const data = await eventService.getEvent(Number(id));
        
// //         // Transform the event data for form consumption
// //         const formattedEvent = {
// //           ...data,
// //           start_date: formatDateTimeForInput(data.start_date),
// //           end_date: formatDateTimeForInput(data.end_date),
// //           registration_deadline: data.registration_deadline 
// //             ? formatDateTimeForInput(data.registration_deadline)
// //             : '',
// //           max_participants: Number(data.max_participants) || 100,
// //           registration_fee: Number(data.registration_fee) || 0,
// //           is_paid_event: Boolean(data.is_paid_event),
// //           // Convert numeric values to strings if they exist
// //           year: data.year ? String(data.year) : '',
// //           semester: data.semester ? String(data.semester) : '',
// //         };
        
// //         console.log('Original event data:', data);
// //         console.log('Formatted event data:', formattedEvent);
        
// //         setEvent(formattedEvent);
// //       } catch (error: any) {
// //         console.error('Failed to load event:', error);
// //         toast.error('Failed to load event');
// //         navigate('/events');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     if (id) loadEvent();
// //   }, [id, navigate]);

// //   const handleSubmit = async (data: any) => {
// //     if (!id) return;
// //     setIsSaving(true);
    
// //     console.log('Form data being submitted:', data);
    
// //     try {
// //       // Clean up the data before sending
// //       const cleanData = {
// //         ...data,
// //         // Remove empty strings for optional fields
// //         registration_deadline: data.registration_deadline?.trim() || undefined,
// //         class_name: data.class_name?.trim() || undefined,
// //         year: data.year?.trim() || undefined,
// //         semester: data.semester?.trim() || undefined,
// //       };
      
// //       console.log('Cleaned data for API:', cleanData);
      
// //       await eventService.updateEvent(Number(id), cleanData);
// //       toast.success('Event updated successfully!');
// //       navigate(`/events/${id}`);
// //     } catch (error: any) {
// //       console.error('Update error:', error);
      
// //       let errorMessage = 'Failed to update event';
      
// //       if (error?.response?.data) {
// //         const errorData = error.response.data;
// //         if (errorData.error) {
// //           errorMessage = errorData.error;
// //         } else if (typeof errorData === 'object') {
// //           // Handle field-specific errors
// //           const fieldErrors = Object.entries(errorData)
// //             .map(([field, messages]) => {
// //               if (Array.isArray(messages)) {
// //                 return `${field}: ${messages.join(', ')}`;
// //               }
// //               return `${field}: ${messages}`;
// //             })
// //             .join('; ');
// //           if (fieldErrors) {
// //             errorMessage = fieldErrors;
// //           }
// //         } else if (errorData.message) {
// //           errorMessage = errorData.message;
// //         }
// //       }
      
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="p-6 text-center">
// //         <div className="text-lg text-gray-600 dark:text-gray-300">Loading event...</div>
// //       </div>
// //     );
// //   }

// //   if (!event) {
// //     return (
// //       <div className="p-6 text-center">
// //         <div className="text-lg text-red-600">Event not found</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="mx-auto max-w-5xl space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Event</h1>
// //         <Link
// //           to={`/events/${id}`}
// //           className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-gray-200"
// //         >
// //           <ArrowLeftIcon className="h-4 w-4" />
// //           Back to Event
// //         </Link>
// //       </div>

// //       <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
// //         <div className="flex items-center gap-2 border-b border-gray-200 dark:border-neutral-800 px-6 py-4">
// //           <CalendarDaysIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
// //           <h2 className="text-base font-semibold text-gray-900 dark:text-white">
// //             Update event details
// //           </h2>
// //         </div>
// //         <div className="p-6">
// //           <EventForm 
// //             onSubmit={handleSubmit} 
// //             isLoading={isSaving} 
// //             initialData={event} 
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // frontend/src/pages/events/EditEventPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { eventService } from '../../services/eventService';
// import { EventForm } from '../../components/events/EventForm';
// import toast from 'react-hot-toast';
// import { ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// // Helper: format API datetimes to datetime-local input value
// const formatDateTimeForInput = (dateString: string): string => {
//   if (!dateString) return '';
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   return `${year}-${month}-${day}T${hours}:${minutes}`;
// };

// /** ★ Robust normalizer: handles
//  *   - native datetime-local:  "2025-09-10T15:45"
//  *   - AM/PM formatted:        "09/10/2025 03:45 PM"
//  *   Always returns ISO string (UTC) or undefined if empty.
//  */
// const toISO = (raw?: string): string | undefined => {
//   const value = (raw || '').trim();
//   if (!value) return undefined;

//   // 1) Try native parse first
//   const d1 = new Date(value);
//   if (!isNaN(d1.getTime())) return d1.toISOString();

//   // 2) Try AM/PM format: MM/DD/YYYY HH:mm AM|PM
//   //    Examples: "09/10/2025 03:45 PM", "9/1/2025 7:05 AM"
//   const m = value.match(
//     /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/i
//   );
//   if (m) {
//     let [, mm, dd, yyyy, hh, min, ap] = m;
//     let H = parseInt(hh, 10);
//     const minute = parseInt(min, 10);
//     if (ap.toUpperCase() === 'PM' && H !== 12) H += 12;
//     if (ap.toUpperCase() === 'AM' && H === 12) H = 0;

//     const month = parseInt(mm, 10) - 1;
//     const day = parseInt(dd, 10);
//     const year = parseInt(yyyy, 10);

//     const d2 = new Date(year, month, day, H, minute, 0, 0); // local time
//     if (!isNaN(d2.getTime())) return d2.toISOString();
//   }

//   // 3) If still invalid, keep it undefined so backend isn’t sent garbage
//   return undefined;
// };

// export const EditEventPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [event, setEvent] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadEvent = async () => {
//       try {
//         const data = await eventService.getEvent(Number(id));

//         const formattedEvent = {
//           ...data,
//           start_date: formatDateTimeForInput(data.start_date),
//           end_date: formatDateTimeForInput(data.end_date),
//           registration_deadline: data.registration_deadline
//             ? formatDateTimeForInput(data.registration_deadline)
//             : '',
//           max_participants: Number(data.max_participants) || 100,
//           registration_fee: Number(data.registration_fee) || 0,
//           is_paid_event: Boolean(data.is_paid_event),
//           year: data.year ? String(data.year) : '',
//           semester: data.semester ? String(data.semester) : '',
//         };

//         setEvent(formattedEvent);
//       } catch (error: any) {
//         console.error('Failed to load event:', error);
//         toast.error('Failed to load event');
//         navigate('/events');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (id) loadEvent();
//   }, [id, navigate]);

//   const handleSubmit = async (data: any) => {
//     if (!id) return;
//     setIsSaving(true);

//     try {
//       // ★ Normalize date strings to ISO and trim optionals
//       const cleanData = {
//         ...data,
//         start_date: toISO(data.start_date),
//         end_date: toISO(data.end_date),
//         registration_deadline: toISO(data.registration_deadline),

//         class_name: data.class_name?.trim() || undefined,
//         year: data.year?.trim() || undefined,
//         semester: data.semester?.trim() || undefined,

//         max_participants: data.max_participants ?? 100,
//         registration_fee: data.is_paid_event ? (data.registration_fee ?? 0) : 0,
//       };

//       await eventService.updateEvent(Number(id), cleanData);
//       toast.success('Event updated successfully!');
//       navigate(`/events/${id}`);
//     } catch (error: any) {
//       console.error('Update error:', error);
//       let errorMessage = 'Failed to update event';
//       if (error?.response?.data) {
//         const errorData = error.response.data;
//         if (errorData.error) {
//           errorMessage = errorData.error;
//         } else if (typeof errorData === 'object') {
//           const fieldErrors = Object.entries(errorData)
//             .map(([field, messages]) => {
//               if (Array.isArray(messages)) return `${field}: ${messages.join(', ')}`;
//               return `${field}: ${messages}`;
//             })
//             .join('; ');
//           if (fieldErrors) errorMessage = fieldErrors;
//         } else if (errorData.message) {
//           errorMessage = errorData.message;
//         }
//       }
//       toast.error(errorMessage);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 text-center">
//         <div className="text-lg text-gray-600 dark:text-gray-300">Loading event...</div>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="p-6 text-center">
//         <div className="text-lg text-red-600">Event not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Event</h1>
//         <Link
//           to={`/events/${id}`}
//           className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-gray-200"
//         >
//           <ArrowLeftIcon className="h-4 w-4" />
//           Back to Event
//         </Link>
//       </div>

//       <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
//         <div className="flex items-center gap-2 border-b border-gray-200 dark:border-neutral-800 px-6 py-4">
//           <CalendarDaysIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
//           <h2 className="text-base font-semibold text-gray-900 dark:text-white">
//             Update event details
//           </h2>
//         </div>
//         <div className="p-6">
//           <EventForm
//             onSubmit={handleSubmit}
//             isLoading={isSaving}
//             initialData={event}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

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