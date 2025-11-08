// // // // import React, { useEffect, useState } from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { eventService } from '../../services/eventService';
// // // // import { useAuth } from '../../contexts/AuthContext';
// // // // import type { Event } from '../../types';
// // // // import { EventCard } from '../../components/events/EventCard';
// // // // import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// // // // import { Button } from '../../components/ui/Button';
// // // // import { Select } from '../../components/ui/Select';
// // // // import { EVENT_TYPES, EVENT_LEVELS } from '../../utils/constants';
// // // // import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
// // // // import toast from 'react-hot-toast';

// // // // export const EventsPage: React.FC = () => {
// // // //   const { user } = useAuth();
// // // //   const [events, setEvents] = useState<Event[]>([]);
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [isRegistering, setIsRegistering] = useState<number | null>(null);
// // // //   const [filters, setFilters] = useState({
// // // //     level: '',
// // // //     type: '',
// // // //     status: '',
// // // //   });

// // // //   const fetchEvents = async () => {
// // // //     try {
// // // //       const data = await eventService.getEvents(filters);
// // // //       setEvents(data);
// // // //     } catch (error) {
// // // //       console.error('Events fetch error:', error);
// // // //       toast.error('Failed to load events');
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchEvents();
// // // //   }, [filters]);

// // // //   const handleRegister = async (eventId: number) => {
// // // //     setIsRegistering(eventId);
// // // //     try {
// // // //       await eventService.registerForEvent(eventId);
// // // //       toast.success('Registration successful!');
// // // //       fetchEvents(); // Refresh events
// // // //     } catch (error: any) {
// // // //       toast.error(error.response?.data?.error || 'Registration failed');
// // // //     } finally {
// // // //       setIsRegistering(null);
// // // //     }
// // // //   };

// // // //   const handleFilterChange = (key: string, value: string) => {
// // // //     setFilters(prev => ({ ...prev, [key]: value }));
// // // //   };

// // // //   const canCreateEvent = user?.role === 'Department' || user?.role === 'Organization';

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-96">
// // // //         <LoadingSpinner size="lg" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div className="flex items-center justify-between">
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold text-gray-900">Events</h1>
// // // //           <p className="mt-2 text-gray-600">
// // // //             Discover and participate in exciting events
// // // //           </p>
// // // //         </div>
        
// // // //         {canCreateEvent && (
// // // //           <Link to="/events/create">
// // // //             <Button className="flex items-center space-x-2">
// // // //               <PlusIcon className="h-5 w-5" />
// // // //               <span>Create Event</span>
// // // //             </Button>
// // // //           </Link>
// // // //         )}
// // // //       </div>

// // // //       {/* Filters */}
// // // //       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// // // //         <div className="flex items-center space-x-2 mb-4">
// // // //           <FunnelIcon className="h-5 w-5 text-gray-400" />
// // // //           <span className="text-sm font-medium text-gray-700">Filters</span>
// // // //         </div>
        
// // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //           <Select
// // // //             options={EVENT_LEVELS}
// // // //             value={filters.level}
// // // //             onChange={(e) => handleFilterChange('level', e.target.value)}
// // // //             placeholder="All levels"
// // // //           />
          
// // // //           <Select
// // // //             options={EVENT_TYPES}
// // // //             value={filters.type}
// // // //             onChange={(e) => handleFilterChange('type', e.target.value)}
// // // //             placeholder="All types"
// // // //           />
          
// // // //           <Select
// // // //             options={[
// // // //               { value: 'approved', label: 'Approved' },
// // // //               { value: 'pending', label: 'Pending' },
// // // //               { value: 'completed', label: 'Completed' },
// // // //             ]}
// // // //             value={filters.status}
// // // //             onChange={(e) => handleFilterChange('status', e.target.value)}
// // // //             placeholder="All statuses"
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {/* Events Grid */}
// // // //       {events.length > 0 ? (
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //           {events.map((event) => (
// // // //             <EventCard
// // // //               key={event.id}
// // // //               event={event}
// // // //               onRegister={user?.role === 'Student' ? handleRegister : undefined}
// // // //               isRegistering={isRegistering === event.id}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       ) : (
// // // //         <div className="text-center py-12">
// // // //           <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
// // // //             <span className="text-4xl">📅</span>
// // // //           </div>
// // // //           <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
// // // //           <p className="text-gray-500 mb-4">
// // // //             {Object.values(filters).some(f => f) 
// // // //               ? 'Try adjusting your filters to see more events.'
// // // //               : 'No events are currently available.'
// // // //             }
// // // //           </p>
// // // //           {canCreateEvent && (
// // // //             <Link to="/events/create">
// // // //               <Button>Create Your First Event</Button>
// // // //             </Link>
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };



// // // import React, { useEffect, useState } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { eventService } from '../../services/eventService';
// // // import { useAuth } from '../../contexts/AuthContext';
// // // import type { Event } from '../../types';
// // // import { EventCard } from '../../components/events/EventCard';
// // // import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// // // import { Button } from '../../components/ui/Button';
// // // import { Select } from '../../components/ui/Select';
// // // import { EVENT_TYPES, EVENT_LEVELS } from '../../utils/constants';
// // // import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
// // // import toast from 'react-hot-toast';

// // // export const EventsPage: React.FC = () => {
// // //   const { user } = useAuth();
// // //   const [events, setEvents] = useState<Event[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [isRegistering, setIsRegistering] = useState<number | null>(null);

// // //   // filters (kept for power users)
// // //   const [filters, setFilters] = useState({ level: '', type: '', status: '' });

// // //   // student view toggle
// // //   const [studentView, setStudentView] = useState<'approved' | 'completed'>('approved');
// // //   const isStudent = user?.role === 'Student';
// // //   const isOrganizer = user?.role === 'Department' || user?.role === 'Organization';
// // //   const isChief = user?.role === 'Campus-cheif';
// // //   const isAdmin = user?.role === 'Admin';

// // //   const fetchEvents = async () => {
// // //     try {
// // //       let data: Event[] = [];
// // //       if (isStudent) {
// // //         if (studentView === 'completed') {
// // //           data = await eventService.getCompletedEvents();
// // //         } else {
// // //           data = await eventService.getEvents({ ...filters, status: 'approved' });
// // //         }
// // //       } else {
// // //         data = await eventService.getEvents(filters);
// // //       }
// // //       setEvents(data);
// // //     } catch (error) {
// // //       console.error('Events fetch error:', error);
// // //       toast.error('Failed to load events');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     setIsLoading(true);
// // //     fetchEvents();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [filters, studentView]);

// // //   const handleRegister = async (eventId: number) => {
// // //     setIsRegistering(eventId);
// // //     try {
// // //       const { message } = await eventService.registerForEvent(eventId);
// // //       toast.success(message);
// // //       fetchEvents();
// // //     } catch (error: any) {
// // //       toast.error(error.response?.data?.error || 'Registration failed');
// // //     } finally {
// // //       setIsRegistering(null);
// // //     }
// // //   };

// // //   const handleFilterChange = (key: string, value: string) => {
// // //     setFilters((prev) => ({ ...prev, [key]: value }));
// // //   };

// // //   const canCreateEvent = isOrganizer;

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-96">
// // //         <LoadingSpinner size="lg" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center justify-between">
// // //         <div>
// // //           <h1 className="text-3xl font-bold text-gray-900">Events</h1>
// // //           <p className="mt-2 text-gray-600">Discover and participate in exciting events</p>
// // //         </div>

// // //         <div className="flex items-center gap-3">
// // //           {/* role shortcuts */}
// // //           {isStudent && (
// // //             <div className="rounded-lg border border-gray-200 p-1 bg-white">
// // //               <button
// // //                 onClick={() => setStudentView('approved')}
// // //                 className={`px-3 py-1.5 text-sm rounded-md ${
// // //                   studentView === 'approved' ? 'bg-indigo-600 text-white' : 'text-gray-700'
// // //                 }`}
// // //               >
// // //                 Approved
// // //               </button>
// // //               <button
// // //                 onClick={() => setStudentView('completed')}
// // //                 className={`ml-1 px-3 py-1.5 text-sm rounded-md ${
// // //                   studentView === 'completed' ? 'bg-indigo-600 text-white' : 'text-gray-700'
// // //                 }`}
// // //               >
// // //                 Completed
// // //               </button>
// // //             </div>
// // //           )}

// // //           {(isOrganizer || isChief || isAdmin) && (
// // //             <div className="hidden sm:flex items-center gap-2">
// // //               <Link to="/events/pending" className="text-sm text-indigo-600 hover:text-indigo-500">Pending</Link>
// // //               <Link to="/events/cancelled" className="text-sm text-indigo-600 hover:text-indigo-500">Cancelled</Link>
// // //               <Link to="/events/completed" className="text-sm text-indigo-600 hover:text-indigo-500">Completed</Link>
// // //               {(isChief || isAdmin) && (
// // //                 <Link to="/events/conflicts" className="text-sm text-indigo-600 hover:text-indigo-500">Conflicts</Link>
// // //               )}
// // //             </div>
// // //           )}

// // //           {canCreateEvent && (
// // //             <Link to="/events/create">
// // //               <Button className="flex items-center space-x-2">
// // //                 <PlusIcon className="h-5 w-5" />
// // //                 <span>Create Event</span>
// // //               </Button>
// // //             </Link>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Filters (kept for non-students and as extra for students) */}
// // //       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// // //         <div className="flex items-center space-x-2 mb-4">
// // //           <FunnelIcon className="h-5 w-5 text-gray-400" />
// // //           <span className="text-sm font-medium text-gray-700">Filters</span>
// // //         </div>

// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //           <Select
// // //             options={EVENT_LEVELS}
// // //             value={filters.level}
// // //             onChange={(e) => handleFilterChange('level', e.target.value)}
// // //             placeholder="All levels"
// // //           />

// // //           <Select
// // //             options={EVENT_TYPES}
// // //             value={filters.type}
// // //             onChange={(e) => handleFilterChange('type', e.target.value)}
// // //             placeholder="All types"
// // //           />

// // //           <Select
// // //             options={[
// // //               { value: 'approved', label: 'Approved' },
// // //               { value: 'pending', label: 'Pending' },
// // //               { value: 'completed', label: 'Completed' },
// // //               { value: 'cancelled', label: 'Cancelled' },
// // //               { value: 'rejected', label: 'Rejected' },
// // //             ]}
// // //             value={filters.status}
// // //             onChange={(e) => handleFilterChange('status', e.target.value)}
// // //             placeholder="All statuses"
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Events Grid */}
// // //       {events.length > 0 ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {events.map((ev) => (
// // //             <EventCard
// // //               key={ev.id}
// // //               event={ev}
// // //               onRegister={isStudent ? handleRegister : undefined}
// // //               isRegistering={isRegistering === ev.id}
// // //             />
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center py-12">
// // //           <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
// // //             <span className="text-4xl">📅</span>
// // //           </div>
// // //           <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
// // //           <p className="text-gray-500 mb-4">
// // //             {Object.values(filters).some((f) => f)
// // //               ? 'Try adjusting your filters to see more events.'
// // //               : 'No events are currently available.'}
// // //           </p>
// // //           {canCreateEvent && (
// // //             <Link to="/events/create">
// // //               <Button>Create Your First Event</Button>
// // //             </Link>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // import React, { useEffect, useMemo, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { eventService } from '../../services/eventService';
// // import { useAuth } from '../../contexts/AuthContext';
// // import type { Event } from '../../types';
// // import { EventCard } from '../../components/events/EventCard';
// // import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// // import { Button } from '../../components/ui/Button';
// // import { Select } from '../../components/ui/Select';
// // import { EVENT_TYPES, EVENT_LEVELS } from '../../utils/constants';
// // import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
// // import toast from 'react-hot-toast';

// // type ViewKey = 'approved' | 'pending' | 'cancelled' | 'completed' | 'conflicts';

// // // very small local type so we don't import extra types
// // type ConflictRow = {
// //   id: number;
// //   event1_title: string;
// //   event2_title: string;
// //   status: string;
// //   detected_at: string;
// // };

// // export const EventsPage: React.FC = () => {
// //   const { user } = useAuth();

// //   const isStudent = user?.role === 'Student';
// //   const isOrganizer = user?.role === 'Department' || user?.role === 'Organization';
// //   const isChief = user?.role === 'Campus-cheif';
// //   const isAdmin = user?.role === 'Admin';

// //   const [events, setEvents] = useState<Event[]>([]);
// //   const [conflicts, setConflicts] = useState<ConflictRow[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isRegistering, setIsRegistering] = useState<number | null>(null);

// //   const [filters, setFilters] = useState({
// //     level: '',
// //     type: '',
// //   });

// //   const views = useMemo((): { key: ViewKey; label: string }[] => {
// //     if (isStudent) return [{ key: 'approved', label: 'Approved' }, { key: 'completed', label: 'Completed' }];
// //     if (isChief || isAdmin)
// //       return [
// //         { key: 'approved', label: 'Approved' },
// //         { key: 'pending', label: 'Pending' },
// //         { key: 'cancelled', label: 'Cancelled' },
// //         { key: 'completed', label: 'Completed' },
// //         { key: 'conflicts', label: 'Conflicts' },
// //       ];
// //     // organizer (department / organization)
// //     return [
// //       { key: 'approved', label: 'Approved' },
// //       { key: 'pending', label: 'Pending' },
// //       { key: 'cancelled', label: 'Cancelled' },
// //       { key: 'completed', label: 'Completed' },
// //     ];
// //   }, [isStudent, isChief, isAdmin]);

// //   const [view, setView] = useState<ViewKey>(views[0].key);

// //   const fetchData = async () => {
// //     setIsLoading(true);
// //     try {
// //       if (view === 'approved') {
// //         const data = await eventService.getEvents({
// //           level: filters.level || undefined,
// //           type: filters.type || undefined,
// //           status: 'approved',
// //         });
// //         setEvents(data);
// //         setConflicts([]);
// //       } else if (view === 'pending') {
// //         const data = await eventService.getPendingEvents();
// //         setEvents(data);
// //         setConflicts([]);
// //       } else if (view === 'cancelled') {
// //         const data = await eventService.getCancelledEvents();
// //         setEvents(data);
// //         setConflicts([]);
// //       } else if (view === 'completed') {
// //         const data = await eventService.getCompletedEvents();
// //         setEvents(data);
// //         setConflicts([]);
// //       } else {
// //         // conflicts (chief/admin)
// //         const rows =
// //           (eventService as any).getConflicts
// //             ? await (eventService as any).getConflicts()
// //             : await eventService.getEventConflicts();
// //         setConflicts(rows as ConflictRow[]);
// //         setEvents([]);
// //       }
// //     } catch (error) {
// //       console.error('Events fetch error:', error);
// //       toast.error('Failed to load data');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [view, filters]);

// //   const handleRegister = async (eventId: number) => {
// //     setIsRegistering(eventId);
// //     try {
// //       await eventService.registerForEvent(eventId);
// //       toast.success('Registration successful!');
// //       fetchData(); // Refresh list
// //     } catch (error: any) {
// //       toast.error(error?.response?.data?.error || 'Registration failed');
// //     } finally {
// //       setIsRegistering(null);
// //     }
// //   };

// //   const handleFilterChange = (key: 'level' | 'type', value: string) => {
// //     setFilters((prev) => ({ ...prev, [key]: value }));
// //   };

// //   const canCreateEvent = isOrganizer;

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-96">
// //         <LoadingSpinner size="lg" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex items-start sm:items-center justify-between gap-4">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900 white:text-white">Events</h1>
// //           <p className="mt-2 text-gray-600 white:text-gray-400">Discover and participate in exciting events</p>
// //         </div>

// //         {/* Segmented control (pretty pill) */}
// //         <div className="flex items-center gap-2">
// //           <div className="p-1 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-sm flex">
// //             {views.map(({ key, label }) => (
// //               <button
// //                 key={key}
// //                 onClick={() => setView(key)}
// //                 className={[
// //                   'px-4 py-1.5 text-sm rounded-full transition-colors',
// //                   view === key
// //                     ? 'bg-indigo-600 text-white shadow-sm'
// //                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800',
// //                 ].join(' ')}
// //               >
// //                 {label}
// //               </button>
// //             ))}
// //           </div>

// //           {canCreateEvent && (
// //             <Link to="/events/create">
// //               <Button className="hidden sm:inline-flex items-center space-x-2">
// //                 <PlusIcon className="h-5 w-5" />
// //                 <span>Create Event</span>
// //               </Button>
// //             </Link>
// //           )}
// //         </div>
// //       </div>

// //       {/* Filters (hide on Conflicts) */}
// //       {view !== 'conflicts' && (
// //         <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 p-4">
// //           <div className="flex items-center space-x-2 mb-4">
// //             <FunnelIcon className="h-5 w-5 text-gray-400" />
// //             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
// //           </div>

// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //             <Select
// //               options={EVENT_LEVELS}
// //               value={filters.level}
// //               onChange={(e) => handleFilterChange('level', e.target.value)}
// //               placeholder="All levels"
// //             />
// //             <Select
// //               options={EVENT_TYPES}
// //               value={filters.type}
// //               onChange={(e) => handleFilterChange('type', e.target.value)}
// //               placeholder="All types"
// //             />
// //             {/* status filter removed in favor of the segmented control */}
// //           </div>
// //         </div>
// //       )}

// //       {/* Content */}
// //       {view === 'conflicts' ? (
// //         conflicts.length > 0 ? (
// //           <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">
// //             <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-700 text-sm font-medium text-gray-700 dark:text-gray-200">
// //               Detected Conflicts
// //             </div>
// //             <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
// //               {conflicts.map((c) => (
// //                 <li key={c.id} className="p-4 text-sm">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <div className="font-medium text-gray-900 dark:text-gray-100">
// //                         {c.event1_title} <span className="text-gray-400">vs</span> {c.event2_title}
// //                       </div>
// //                       <div className="text-gray-500 dark:text-gray-400 mt-1">
// //                         Status: {c.status} • Detected: {new Date(c.detected_at).toLocaleString()}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         ) : (
// //           <EmptyState title="No conflict events" subtitle="All clear — no overlaps right now." />
// //         )
// //       ) : events.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {events.map((event) => (
// //             <EventCard
// //               key={event.id}
// //               event={event}
// //               onRegister={isStudent ? handleRegister : undefined}
// //               isRegistering={isRegistering === event.id}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <EmptyState
// //           title="No events found"
// //           subtitle={
// //             view === 'pending'
// //               ? "You don't have any pending events."
// //               : view === 'cancelled'
// //               ? "You don't have any cancelled events."
// //               : view === 'completed'
// //               ? 'No completed events yet.'
// //               : 'Try adjusting your filters to see more events.'
// //           }
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
// //   return (
// //     <div className="text-center py-12">
// //       <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
// //         <span className="text-4xl">📅</span>
// //       </div>
// //       <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
// //       <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
// //     </div>
// //   );
// // }




// // // frontend/src/pages/events/EventsPage.tsx
// // import React, { useEffect, useMemo, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { eventService } from '../../services/eventService';
// // import { useAuth } from '../../contexts/AuthContext';
// // import type { Event } from '../../types';
// // import { EventCard } from '../../components/events/EventCard';
// // import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// // import { Button } from '../../components/ui/Button';
// // import { Select } from '../../components/ui/Select';
// // import { EVENT_TYPES, EVENT_LEVELS } from '../../utils/constants';
// // import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
// // import toast from 'react-hot-toast';

// // type ViewKey = 'approved' | 'pending' | 'cancelled' | 'completed' | 'conflicts';

// // // very small local type so we don't import extra types
// // type ConflictRow = {
// //   id: number;
// //   event1_title: string;
// //   event2_title: string;
// //   status: string;
// //   detected_at: string;
// // };

// // export const EventsPage: React.FC = () => {
// //   const { user } = useAuth();

// //   const isStudent = user?.role === 'Student';
// //   const isOrganizer = user?.role === 'Department' || user?.role === 'Organization';
// //   const isChief = user?.role === 'Campus-cheif';
// //   const isAdmin = user?.role === 'Admin';

// //   const [events, setEvents] = useState<Event[]>([]);
// //   const [conflicts, setConflicts] = useState<ConflictRow[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isRegistering, setIsRegistering] = useState<number | null>(null);

// //   const [filters, setFilters] = useState({
// //     level: '',
// //     type: '',
// //   });

// //   const views = useMemo((): { key: ViewKey; label: string }[] => {
// //     if (isStudent) return [{ key: 'approved', label: 'Approved' }, { key: 'completed', label: 'Completed' }];
// //     if (isChief || isAdmin)
// //       return [
// //         { key: 'approved', label: 'Approved' },
// //         { key: 'pending', label: 'Pending' },
// //         { key: 'cancelled', label: 'Cancelled' },
// //         { key: 'completed', label: 'Completed' },
// //         { key: 'conflicts', label: 'Conflicts' },
// //       ];
// //     // organizer (department / organization)
// //     return [
// //       { key: 'approved', label: 'Approved' },
// //       { key: 'pending', label: 'Pending' },
// //       { key: 'cancelled', label: 'Cancelled' },
// //       { key: 'completed', label: 'Completed' },
// //     ];
// //   }, [isStudent, isChief, isAdmin]);

// //   const [view, setView] = useState<ViewKey>(views[0].key);

// //   // apply level/type filters locally when using endpoints that don't accept params
// //   const applyLocalFilters = (list: Event[]) =>
// //     list.filter(
// //       (ev) =>
// //         (!filters.level || ev.event_level === filters.level) &&
// //         (!filters.type || ev.event_type === filters.type)
// //     );

// //   const fetchData = async () => {
// //     setIsLoading(true);
// //     try {
// //       if (view === 'approved') {
// //         // server-side filtering supported here
// //         const data = await eventService.getEvents({
// //           level: filters.level || undefined,
// //           type: filters.type || undefined,
// //           status: 'approved',
// //         });
// //         setEvents(data);
// //         setConflicts([]);
// //       } else if (view === 'pending') {
// //         const data = await eventService.getPendingEvents();
// //         setEvents(applyLocalFilters(data)); // client-side filter
// //         setConflicts([]);
// //       } else if (view === 'cancelled') {
// //         const data = await eventService.getCancelledEvents();
// //         setEvents(applyLocalFilters(data)); // client-side filter
// //         setConflicts([]);
// //       } else if (view === 'completed') {
// //         const data = await eventService.getCompletedEvents();
// //         setEvents(applyLocalFilters(data)); // client-side filter
// //         setConflicts([]);
// //       } else {
// //         // conflicts (chief/admin)
// //         const rows =
// //           (eventService as any).getConflicts
// //             ? await (eventService as any).getConflicts()
// //             : await eventService.getEventConflicts();
// //         setConflicts(rows as ConflictRow[]);
// //         setEvents([]);
// //       }
// //     } catch (error) {
// //       console.error('Events fetch error:', error);
// //       toast.error('Failed to load data');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [view, filters]);

// //   const handleRegister = async (eventId: number) => {
// //     setIsRegistering(eventId);
// //     try {
// //       await eventService.registerForEvent(eventId);
// //       toast.success('Registration successful!');
// //       fetchData(); // Refresh list
// //     } catch (error: any) {
// //       toast.error(error?.response?.data?.error || 'Registration failed');
// //     } finally {
// //       setIsRegistering(null);
// //     }
// //   };

// //   const handleFilterChange = (key: 'level' | 'type', value: string) => {
// //     setFilters((prev) => ({ ...prev, [key]: value }));
// //   };

// //   const canCreateEvent = isOrganizer;

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-96">
// //         <LoadingSpinner size="lg" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex items-start sm:items-center justify-between gap-4">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900 white:text-white">Events</h1>
// //           <p className="mt-2 text-gray-600 white:text-gray-400">Discover and participate in exciting events</p>
// //         </div>

// //         {/* Segmented control (pretty pill) */}
// //         <div className="flex items-center gap-2">
// //           <div className="p-1 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-sm flex">
// //             {views.map(({ key, label }) => (
// //               <button
// //                 key={key}
// //                 onClick={() => setView(key)}
// //                 className={[
// //                   'px-4 py-1.5 text-sm rounded-full transition-colors',
// //                   view === key
// //                     ? 'bg-indigo-600 text-white shadow-sm'
// //                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800',
// //                 ].join(' ')}
// //               >
// //                 {label}
// //               </button>
// //             ))}
// //           </div>

// //           {canCreateEvent && (
// //             <Link to="/events/create">
// //               <Button className="hidden sm:inline-flex items-center space-x-2">
// //                 <PlusIcon className="h-5 w-5" />
// //                 <span>Create Event</span>
// //               </Button>
// //             </Link>
// //           )}
// //         </div>
// //       </div>

// //       {/* Filters (hide on Conflicts) */}
// //       {view !== 'conflicts' && (
// //         <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 p-4">
// //           <div className="flex items-center space-x-2 mb-4">
// //             <FunnelIcon className="h-5 w-5 text-gray-400" />
// //             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
// //           </div>

// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //             <Select
// //               options={EVENT_LEVELS}
// //               value={filters.level}
// //               onChange={(e) => handleFilterChange('level', e.target.value)}
// //               placeholder="All levels"
// //             />
// //             <Select
// //               options={EVENT_TYPES}
// //               value={filters.type}
// //               onChange={(e) => handleFilterChange('type', e.target.value)}
// //               placeholder="All types"
// //             />
// //             {/* status filter removed in favor of the segmented control */}
// //           </div>
// //         </div>
// //       )}

// //       {/* Content */}
// //       {view === 'conflicts' ? (
// //         conflicts.length > 0 ? (
// //           <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">
// //             <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-700 text-sm font-medium text-gray-700 dark:text-gray-200">
// //               Detected Conflicts
// //             </div>
// //             <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
// //               {conflicts.map((c) => (
// //                 <li key={c.id} className="p-4 text-sm">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <div className="font-medium text-gray-900 dark:text-gray-100">
// //                         {c.event1_title} <span className="text-gray-400">vs</span> {c.event2_title}
// //                       </div>
// //                       <div className="text-gray-500 dark:text-gray-400 mt-1">
// //                         Status: {c.status} • Detected: {new Date(c.detected_at).toLocaleString()}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         ) : (
// //           <EmptyState title="No conflict events" subtitle="All clear — no overlaps right now." />
// //         )
// //       ) : events.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {events.map((event) => (
// //             <EventCard
// //               key={event.id}
// //               event={event}
// //               onRegister={isStudent ? handleRegister : undefined}
// //               isRegistering={isRegistering === event.id}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <EmptyState
// //           title="No events found"
// //           subtitle={
// //             view === 'pending'
// //               ? "You don't have any pending events."
// //               : view === 'cancelled'
// //               ? "You don't have any cancelled events."
// //               : view === 'completed'
// //               ? 'No completed events yet.'
// //               : 'Try adjusting your filters to see more events.'
// //           }
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
// //   return (
// //     <div className="text-center py-12">
// //       <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
// //         <span className="text-4xl">📅</span>
// //       </div>
// //       <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
// //       <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
// //     </div>
// //   );
// // };


// // frontend/src/pages/events/EventsPage.tsx
// import React, { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { eventService } from '../../services/eventService';
// import { useAuth } from '../../contexts/AuthContext';
// import type { Event } from '../../types';
// import { EventCard } from '../../components/events/EventCard';
// import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// import { Button } from '../../components/ui/Button';
// import { Select } from '../../components/ui/Select';
// import { EVENT_TYPES, EVENT_LEVELS } from '../../utils/constants';
// import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
// import toast from 'react-hot-toast';

// type ViewKey = 'approved' | 'pending' | 'cancelled' | 'completed' | 'conflicts';

// // very small local type so we don't import extra types
// type ConflictRow = {
//   id: number;
//   event1_title: string;
//   event2_title: string;
//   status: string;
//   detected_at: string;
// };

// export const EventsPage: React.FC = () => {
//   const { user } = useAuth();

//   const isStudent = user?.role === 'Student';
//   const isOrganizer = user?.role === 'Department' || user?.role === 'Organization';
//   const isChief = user?.role === 'Campus-cheif';
//   const isAdmin = user?.role === 'Admin';

//   const [events, setEvents] = useState<Event[]>([]);
//   const [conflicts, setConflicts] = useState<ConflictRow[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isRegistering, setIsRegistering] = useState<number | null>(null);

//   const [filters, setFilters] = useState({
//     level: '',
//     type: '',
//   });

//   const views = useMemo((): { key: ViewKey; label: string }[] => {
//     if (isStudent) return [{ key: 'approved', label: 'Approved' }, { key: 'completed', label: 'Completed' }];
//     if (isChief || isAdmin)
//       return [
//         { key: 'approved', label: 'Approved' },
//         { key: 'pending', label: 'Pending' },
//         { key: 'cancelled', label: 'Cancelled' },
//         { key: 'completed', label: 'Completed' },
//         { key: 'conflicts', label: 'Conflicts' },
//       ];
//     // organizer (department / organization)
//     return [
//       { key: 'approved', label: 'Approved' },
//       { key: 'pending', label: 'Pending' },
//       { key: 'cancelled', label: 'Cancelled' },
//       { key: 'completed', label: 'Completed' },
//     ];
//   }, [isStudent, isChief, isAdmin]);

//   const [view, setView] = useState<ViewKey>(views[0].key);

//   // apply level/type filters locally when using endpoints that don't accept params
//   const applyLocalFilters = (list: Event[]) =>
//     list.filter(
//       (ev) =>
//         (!filters.level || ev.event_level === filters.level) &&
//         (!filters.type || ev.event_type === filters.type)
//     );

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       if (view === 'approved') {
//         // server-side filtering supported here
//         const data = await eventService.getEvents({
//           level: filters.level || undefined,
//           type: filters.type || undefined,
//           status: 'approved',
//         });
//         setEvents(data);
//         setConflicts([]);
//       } else if (view === 'pending') {
//         const data = await eventService.getPendingEvents();
//         setEvents(applyLocalFilters(data)); // client-side filter
//         setConflicts([]);
//       } else if (view === 'cancelled') {
//         const data = await eventService.getCancelledEvents();
//         setEvents(applyLocalFilters(data)); // client-side filter
//         setConflicts([]);
//       } else if (view === 'completed') {
//         const data = await eventService.getCompletedEvents();
//         setEvents(applyLocalFilters(data)); // client-side filter
//         setConflicts([]);
//       } else {
//         // conflicts (chief/admin)
//         const rows =
//           (eventService as any).getConflicts
//             ? await (eventService as any).getConflicts()
//             : await eventService.getEventConflicts();
//         setConflicts(rows as ConflictRow[]);
//         setEvents([]);
//       }
//     } catch (error) {
//       console.error('Events fetch error:', error);
//       toast.error('Failed to load data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [view, filters]);

//   const handleRegister = async (eventId: number) => {
//     setIsRegistering(eventId);
//     try {
//       await eventService.registerForEvent(eventId);
//       toast.success('Registration successful!');
//       fetchData(); // Refresh list
//     } catch (error: any) {
//       toast.error(error?.response?.data?.error || 'Registration failed');
//     } finally {
//       setIsRegistering(null);
//     }
//   };

//   const handleFilterChange = (key: 'level' | 'type', value: string) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const canCreateEvent = isOrganizer;

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-96">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 white:text-white">Events</h1>
//           <p className="mt-2 text-gray-600 white:text-gray-400">Discover and participate in exciting events</p>
//         </div>

//         {/* Segmented control (pretty pill) */}
//         <div className="flex items-center gap-2">
//           <div className="p-1 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-sm flex">
//             {views.map(({ key, label }) => (
//               <button
//                 key={key}
//                 onClick={() => setView(key)}
//                 className={[
//                   'px-4 py-1.5 text-sm rounded-full transition-colors',
//                   view === key
//                     ? 'bg-indigo-600 text-white shadow-sm'
//                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800',
//                 ].join(' ')}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {canCreateEvent && (
//             <Link to="/events/create">
//               <Button
//                 className="inline-flex items-center gap-2 rounded-full
//                            bg-gradient-to-r from-indigo-600 to-violet-600
//                            px-4 py-2 text-white font-semibold tracking-wide
//                            shadow-lg hover:from-indigo-500 hover:to-violet-500
//                            active:from-indigo-700 active:to-violet-700
//                            focus:outline-none focus:ring-2 focus:ring-indigo-400
//                            focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
//               >
//                 <PlusIcon className="h-5 w-5" />
//                 <span>Create Event</span>
//               </Button>
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Filters (hide on Conflicts) */}
//       {view !== 'conflicts' && (
//         <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 p-4">
//           <div className="flex items-center space-x-2 mb-4">
//             <FunnelIcon className="h-5 w-5 text-gray-400" />
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             <Select
//               options={EVENT_LEVELS}
//               value={filters.level}
//               onChange={(e) => handleFilterChange('level', e.target.value)}
//               placeholder="All levels"
//             />
//             <Select
//               options={EVENT_TYPES}
//               value={filters.type}
//               onChange={(e) => handleFilterChange('type', e.target.value)}
//               placeholder="All types"
//             />
//             {/* status filter removed in favor of the segmented control */}
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {view === 'conflicts' ? (
//         conflicts.length > 0 ? (
//           <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">
//             <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-700 text-sm font-medium text-gray-700 dark:text-gray-200">
//               Detected Conflicts
//             </div>
//             <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
//               {conflicts.map((c) => (
//                 <li key={c.id} className="p-4 text-sm">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="font-medium text-gray-900 dark:text-gray-100">
//                         {c.event1_title} <span className="text-gray-400">vs</span> {c.event2_title}
//                       </div>
//                       <div className="text-gray-500 dark:text-gray-400 mt-1">
//                         Status: {c.status} • Detected: {new Date(c.detected_at).toLocaleString()}
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <EmptyState title="No conflict events" subtitle="All clear — no overlaps right now." />
//         )
//       ) : events.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <EventCard
//               key={event.id}
//               event={event}
//               onRegister={isStudent ? handleRegister : undefined}
//               isRegistering={isRegistering === event.id}
//             />
//           ))}
//         </div>
//       ) : (
//         <EmptyState
//           title="No events found"
//           subtitle={
//             view === 'pending'
//               ? "You don't have any pending events."
//               : view === 'cancelled'
//               ? "You don't have any cancelled events."
//               : view === 'completed'
//               ? 'No completed events yet.'
//               : 'Try adjusting your filters to see more events.'
//           }
//         />
//       )}
//     </div>
//   );
// };

// function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
//   return (
//     <div className="text-center py-12">
//       <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
//         <span className="text-4xl">📅</span>
//       </div>
//       <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
//       <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
//     </div>
//   );
// };

// frontend/src/pages/events/EventsPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import type { Event } from '../../types';
import { EventCard } from '../../components/events/EventCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { EVENT_TYPES, EVENT_LEVELS } from '../../utils/constants';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

type ViewKey = 'approved' | 'pending' | 'cancelled' | 'completed' |  'rejected' | 'conflicts';

// very small local type so we don't import extra types
type ConflictRow = {
  id: number;
  event1_title: string;
  event2_title: string;
  status: string;
  detected_at: string;
};

export const EventsPage: React.FC = () => {
  const { user } = useAuth();

  const isStudent = user?.role === 'Student';
  const isOrganizer = user?.role === 'Department' || user?.role === 'Organization';
  const isChief = user?.role === 'Campus-cheif';
  const isAdmin = user?.role === 'Admin';

  const [events, setEvents] = useState<Event[]>([]);
  const [conflicts, setConflicts] = useState<ConflictRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    level: '',
    type: '',
  });

  const views = useMemo((): { key: ViewKey; label: string }[] => {
    if (isStudent) return [{ key: 'approved', label: 'Approved' }, { key: 'completed', label: 'Completed' }];
    if (isChief || isAdmin)
      return [
        { key: 'approved', label: 'Approved' },
        { key: 'pending', label: 'Pending' },
        { key: 'cancelled', label: 'Cancelled' },
        { key: 'completed', label: 'Completed' },
        { key: 'rejected', label: 'Rejected' },
        { key: 'conflicts', label: 'Conflicts' },
      ];
    // organizer (department / organization)
    return [
      { key: 'approved', label: 'Approved' },
      { key: 'pending', label: 'Pending' },
      { key: 'cancelled', label: 'Cancelled' },
      { key: 'completed', label: 'Completed' },
      { key: 'rejected', label: 'Rejected' },
    ];
  }, [isStudent, isChief, isAdmin]);

  const [view, setView] = useState<ViewKey>(views[0].key);

  // apply level/type filters locally when using endpoints that don't accept params
  const applyLocalFilters = (list: Event[]) =>
    list.filter(
      (ev) =>
        (!filters.level || ev.event_level === filters.level) &&
        (!filters.type || ev.event_type === filters.type)
    );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (view === 'approved') {
        // server-side filtering supported here
        const data = await eventService.getEvents({
          level: filters.level || undefined,
          type: filters.type || undefined,
          status: 'approved',
        });
        setEvents(data);
        setConflicts([]);
      } else if (view === 'pending') {
        const data = await eventService.getPendingEvents();
        setEvents(applyLocalFilters(data)); // client-side filter
        setConflicts([]);
      } else if (view === 'cancelled') {
        const data = await eventService.getCancelledEvents();
        setEvents(applyLocalFilters(data)); // client-side filter
        setConflicts([]);
      } else if (view === 'completed') {
        const data = await eventService.getCompletedEvents();
        setEvents(applyLocalFilters(data)); // client-side filter
        setConflicts([]);
      } else if (view === 'rejected') {
        const data = await eventService.getRejectedEvents();
        setEvents(applyLocalFilters(data)); // client-side filter
        setConflicts([]);
      } else {
        // conflicts (chief/admin)
        const rows =
          (eventService as any).getConflicts
            ? await (eventService as any).getConflicts()
            : await eventService.getEventConflicts();
        setConflicts(rows as ConflictRow[]);
        setEvents([]);
      }
    } catch (error) {
      console.error('Events fetch error:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, filters]);

  const handleRegister = async (eventId: number) => {
    setIsRegistering(eventId);
    try {
      const res = await eventService.registerForEvent(eventId);
      // prefer backend message if present
      toast.success(res?.message || 'Registration successful!');
      fetchData(); // Refresh list
    } catch (error: any) {
      // NEW: read backend text first, then e.message, then fallback
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (typeof error?.message === 'string' ? error.message : 'Registration failed'); // NEW
      toast.error(msg); // NEW
    } finally {
      setIsRegistering(null);
    }
  };

  const handleFilterChange = (key: 'level' | 'type', value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const canCreateEvent = isOrganizer;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 white:text-white">Events</h1>
          <p className="mt-2 text-gray-600 white:text-gray-400">Discover and participate in exciting events</p>
        </div>

        {/* Segmented control (pretty pill) */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-sm flex">
            {views.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={[
                  'px-4 py-1.5 text-sm rounded-full transition-colors',
                  view === key
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
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
      </div>

      {/* Filters (hide on Conflicts) */}
      {view !== 'conflicts' && (
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Select
              options={EVENT_LEVELS}
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
              placeholder="All levels"
            />
            <Select
              options={EVENT_TYPES}
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              placeholder="All types"
            />
            {/* status filter removed in favor of the segmented control */}
          </div>
        </div>
      )}

      {/* Content */}
      {view === 'conflicts' ? (
        conflicts.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-700 text-sm font-medium text-gray-700 dark:text-gray-200">
              Detected Conflicts
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
              {conflicts.map((c) => (
                <li key={c.id} className="p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {c.event1_title} <span className="text-gray-400">vs</span> {c.event2_title}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 mt-1">
                        Status: {c.status} • Detected: {new Date(c.detected_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyState title="No conflict events" subtitle="All clear — no overlaps right now." />
        )
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={isStudent ? handleRegister : undefined}
              isRegistering={isRegistering === event.id}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No events found"
          subtitle={
            view === 'pending'
              ? "You don't have any pending events."
              : view === 'cancelled'
              ? "You don't have any cancelled events."
              : view === 'rejected'
              ? "You don't have any rejected events."
              : view === 'completed'
              ? 'No completed events yet.'
              : 'Try adjusting your filters to see more events.'
          }
        />
      )}
    </div>
  );
};

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
        <span className="text-4xl">📅</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  );
}
