// // // import React, { useEffect, useState } from 'react';
// // // import { useAuth } from '../../contexts/AuthContext';
// // // import { authService } from '../../services/authService';
// // // import { eventService } from '../../services/eventService';
// // // import { StatsCard } from '../../components/dashboard/StatsCard';
// // // import { EventCard } from '../../components/events/EventCard';
// // // import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// // // import { Link } from 'react-router-dom';
// // // import type { DashboardStats, Event } from '../../types';
// // // import { 
// // //   UsersIcon, 
// // //   CalendarIcon, 
// // //   CheckCircleIcon,
// // //   ClockIcon,
// // //   AcademicCapIcon
// // // } from '@heroicons/react/24/outline';
// // // import toast from 'react-hot-toast';

// // // export const DashboardPage: React.FC = () => {
// // //   const { user } = useAuth();
// // //   const [stats, setStats] = useState<DashboardStats>({});
// // //   const [recentEvents, setRecentEvents] = useState<Event[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchDashboardData = async () => {
// // //       try {
// // //         const [statsData, eventsData] = await Promise.all([
// // //           authService.getDashboardStats(),
// // //           eventService.getEvents(),
// // //         ]);
        
// // //         setStats(statsData);
// // //         setRecentEvents(eventsData.slice(0, 6)); // Show only recent 6 events
// // //       } catch (error) {
// // //         console.error('Dashboard data fetch error:', error);
// // //         toast.error('Failed to load dashboard data');
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchDashboardData();
// // //   }, []);

// // //   const handleRegister = async (eventId: number) => {
// // //     try {
// // //       await eventService.registerForEvent(eventId);
// // //       toast.success('Registration successful!');
// // //       // Refresh events
// // //       const eventsData = await eventService.getEvents();
// // //       setRecentEvents(eventsData.slice(0, 6));
// // //     } catch (error: any) {
// // //       toast.error(error.response?.data?.error || 'Registration failed');
// // //     }
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-96">
// // //         <LoadingSpinner size="lg" />
// // //       </div>
// // //     );
// // //   }

// // //   const renderStatsForRole = () => {
// // //     if (user?.role === 'Admin') {
// // //       return (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //           <StatsCard
// // //             title="Total Users"
// // //             value={stats.total_users || 0}
// // //             icon={<UsersIcon className="h-6 w-6 text-primary-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Total Events"
// // //             value={stats.total_events || 0}
// // //             icon={<CalendarIcon className="h-6 w-6 text-primary-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Approved Events"
// // //             value={stats.approved_approvals || 0}
// // //             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Pending Approvals"
// // //             value={stats.pending_approvals || 0}
// // //             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
// // //           />
// // //         </div>
// // //       );
// // //     }

// // //     if (user?.role === 'Student') {
// // //       return (
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // //           <StatsCard
// // //             title="Registered Events"
// // //             value={stats.registered_events || 0}
// // //             icon={<CalendarIcon className="h-6 w-6 text-primary-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Upcoming Events"
// // //             value={stats.upcoming_events || 0}
// // //             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Certificates Earned"
// // //             value={stats.certificates_earned || 0}
// // //             icon={<AcademicCapIcon className="h-6 w-6 text-green-600" />}
// // //           />
// // //         </div>
// // //       );
// // //     }

// // //     if (user?.role === 'Department' || user?.role === 'Organization') {
// // //       return (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //           <StatsCard
// // //             title="Created Events"
// // //             value={stats.created_events || 0}
// // //             icon={<CalendarIcon className="h-6 w-6 text-primary-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Approved Events"
// // //             value={stats.approved_events || 0}
// // //             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Pending Events"
// // //             value={stats.pending_events || 0}
// // //             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Completed Events"
// // //             value={stats.completed_events || 0}
// // //             icon={<CheckCircleIcon className="h-6 w-6 text-blue-600" />}
// // //           />
// // //         </div>
// // //       );
// // //     }

// // //     if (user?.role === 'Campus-cheif') {
// // //       return (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //           <StatsCard
// // //             title="Pending Approvals"
// // //             value={stats.pending_approvals || 0}
// // //             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Approved Events"
// // //             value={stats.approved_events || 0}
// // //             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Total Users"
// // //             value={stats.total_users || 0}
// // //             icon={<UsersIcon className="h-6 w-6 text-primary-600" />}
// // //           />
// // //           <StatsCard
// // //             title="Total Events"
// // //             value={stats.total_events || 0}
// // //             icon={<CalendarIcon className="h-6 w-6 text-primary-600" />}
// // //           />
// // //         </div>
// // //       );
// // //     }

// // //     return null;
// // //   };

// // //   return (
// // //     <div className="space-y-8">
// // //       <div>
// // //         <h1 className="text-3xl font-bold text-gray-900">
// // //           Welcome back, {user?.username}!
// // //         </h1>
// // //         <p className="mt-2 text-gray-600">
// // //           Here's what's happening with your events today.
// // //         </p>
// // //       </div>

// // //       {renderStatsForRole()}

// // //       <div>
// // //         <div className="flex items-center justify-between mb-6">
// // //           <h2 className="text-xl font-semibold text-gray-900">Recent Events</h2>
// // //           <Link
// // //             to="/events"
// // //             className="text-primary-600 hover:text-primary-700 text-sm font-medium"
// // //           >
// // //             View all events →
// // //           </Link>
// // //         </div>

// // //         {recentEvents.length > 0 ? (
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {recentEvents.map((event) => (
// // //               <EventCard
// // //                 key={event.id}
// // //                 event={event}
// // //                 onRegister={user?.role === 'Student' ? handleRegister : undefined}
// // //                 showActions={true}
// // //               />
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           <div className="text-center py-12">
// // //             <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
// // //             <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
// // //             <p className="mt-1 text-sm text-gray-500">
// // //               Get started by creating your first event.
// // //             </p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // import React, { useEffect, useState } from 'react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { authService } from '../../services/authService';
// // import { eventService } from '../../services/eventService';
// // import { StatsCard } from '../../components/dashboard/StatsCard';
// // import { EventCard } from '../../components/events/EventCard';
// // import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// // import { Link } from 'react-router-dom';
// // import type { DashboardStats, Event } from '../../types';
// // import {
// //   UsersIcon,
// //   CalendarIcon,
// //   CheckCircleIcon,
// //   ClockIcon,
// //   AcademicCapIcon,
// //   XCircleIcon,
// //   BuildingOffice2Icon,
// //   BuildingOfficeIcon,
// // } from '@heroicons/react/24/outline';
// // import toast from 'react-hot-toast';

// // export const DashboardPage: React.FC = () => {
// //   const { user } = useAuth();
// //   const [stats, setStats] = useState<DashboardStats>({} as DashboardStats);
// //   const [recentEvents, setRecentEvents] = useState<Event[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         const [statsData, eventsData] = await Promise.all([
// //           authService.getDashboardStats(),
// //           eventService.getEvents(),
// //         ]);
// //         setStats(statsData as DashboardStats);
// //         setRecentEvents((eventsData || []).slice(0, 6));
// //       } catch (error) {
// //         console.error('Dashboard data fetch error:', error);
// //         toast.error('Failed to load dashboard data');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     fetchDashboardData();
// //   }, []);

// //   const handleRegister = async (eventId: number) => {
// //     try {
// //       await eventService.registerForEvent(eventId);
// //       toast.success('Registration successful!');
// //       const eventsData = await eventService.getEvents();
// //       setRecentEvents((eventsData || []).slice(0, 6));
// //     } catch (error: any) {
// //       toast.error(error?.response?.data?.error || 'Registration failed');
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex min-h-96 items-center justify-center">
// //         <LoadingSpinner size="lg" />
// //       </div>
// //     );
// //   }

// //   const StatGrid: React.FC<{ children: React.ReactNode; cols?: string }> = ({ children, cols }) => (
// //     <div className={cols ?? 'grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8'}>
// //       {children}
// //     </div>
// //   );

// //   const renderStatsForRole = () => {
// //     // ADMIN
// //     if (user?.role === 'Admin') {
// //       return (
// //         <StatGrid>
// //           <StatsCard
// //             title="Total Users"
// //             value={stats.total_users ?? 0}
// //             icon={<UsersIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Total Students"
// //             value={stats.total_students ?? 0}
// //             icon={<AcademicCapIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Departments"
// //             value={stats.total_departments ?? 0}
// //             icon={<BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Organizations"
// //             value={stats.total_organization ?? 0}
// //             icon={<BuildingOffice2Icon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Total Events"
// //             value={stats.total_events ?? 0}
// //             icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Approved Events"
// //             value={stats.approved_approvals ?? 0}
// //             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
// //           />
// //           <StatsCard
// //             title="Pending Approvals"
// //             value={stats.pending_approvals ?? 0}
// //             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
// //           />
// //           <StatsCard
// //             title="Cancelled"
// //             value={stats.cancelled_approvals ?? 0}
// //             icon={<XCircleIcon className="h-6 w-6 text-rose-600" />}
// //           />
// //           <StatsCard
// //             title="Completed"
// //             value={stats.completed_events ?? 0}
// //             icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />}
// //           />
// //         </StatGrid>
// //       );
// //     }

// //     // STUDENT
// //     if (user?.role === 'Student') {
// //       return (
// //         <StatGrid cols="grid grid-cols-1 gap-5 md:grid-cols-3 mb-8">
// //           <StatsCard
// //             title="Registered Events"
// //             value={stats.registered_events ?? 0}
// //             icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Upcoming Events"
// //             value={stats.upcoming_events ?? 0}
// //             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
// //           />
// //           <StatsCard
// //             title="Certificates Earned"
// //             value={stats.certificates_earned ?? 0}
// //             icon={<AcademicCapIcon className="h-6 w-6 text-emerald-600" />}
// //           />
// //         </StatGrid>
// //       );
// //     }

// //     // DEPARTMENT / ORGANIZATION
// //     if (user?.role === 'Department' || user?.role === 'Organization') {
// //       return (
// //         <StatGrid>
// //           <StatsCard
// //             title="Created Events"
// //             value={stats.created_events ?? 0}
// //             icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Approved Events"
// //             value={stats.approved_events ?? 0}
// //             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
// //           />
// //           <StatsCard
// //             title="Pending Events"
// //             value={stats.pending_events ?? 0}
// //             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
// //           />
// //           <StatsCard
// //             title="Cancelled Events"
// //             value={stats.cancelled_events ?? 0}
// //             icon={<XCircleIcon className="h-6 w-6 text-rose-600" />}
// //           />
// //           <StatsCard
// //             title="Completed Events"
// //             value={stats.completed_events ?? 0}
// //             icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />}
// //           />
// //         </StatGrid>
// //       );
// //     }

// //     // CAMPUS-CHIEF
// //     if (user?.role === 'Campus-cheif') {
// //       return (
// //         <StatGrid>
// //           <StatsCard
// //             title="Pending Approvals"
// //             value={stats.pending_approvals ?? 0}
// //             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
// //           />
// //           <StatsCard
// //             title="Approved Events"
// //             value={stats.approved_events ?? 0}
// //             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
// //           />
// //           <StatsCard
// //             title="Rejected Events"
// //             value={stats.rejected_events ?? 0}
// //             icon={<XCircleIcon className="h-6 w-6 text-rose-600" />}
// //           />
// //           <StatsCard
// //             title="Cancelled Events"
// //             value={stats.cancelled_events ?? 0}
// //             icon={<XCircleIcon className="h-6 w-6 text-rose-600" />}
// //           />
// //           <StatsCard
// //             title="Completed Events"
// //             value={stats.completed_events ?? 0}
// //             icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />}
// //           />
// //           <StatsCard
// //             title="Total Users"
// //             value={stats.total_users ?? 0}
// //             icon={<UsersIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Total Students"
// //             value={stats.total_students ?? 0}
// //             icon={<AcademicCapIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Departments"
// //             value={stats.total_departments ?? 0}
// //             icon={<BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Organizations"
// //             value={stats.total_organization ?? 0}
// //             icon={<BuildingOffice2Icon className="h-6 w-6 text-indigo-600" />}
// //           />
// //           <StatsCard
// //             title="Total Events"
// //             value={stats.total_events ?? 0}
// //             icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />}
// //           />
// //         </StatGrid>
// //       );
// //     }

// //     return null;
// //   };

// //   return (
// //     <div className="space-y-8">
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-900">
// //           Welcome back, {user?.username}!
// //         </h1>
// //         <p className="mt-2 text-gray-600">
// //           Here’s what’s happening with your events today.
// //         </p>
// //       </div>

// //       {renderStatsForRole()}

// //       <div>
// //         <div className="mb-6 flex items-center justify-between">
// //           <h2 className="text-xl font-semibold text-gray-900">Recent Events</h2>
// //           <Link
// //             to="/events"
// //             className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
// //           >
// //             View all events →
// //           </Link>
// //         </div>

// //         {recentEvents.length > 0 ? (
// //           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
// //             {recentEvents.map((event) => (
// //               <EventCard
// //                 key={event.id}
// //                 event={event}
// //                 onRegister={user?.role === 'Student' ? handleRegister : undefined}
// //                 showActions={true}
// //               />
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="py-12 text-center">
// //             <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
// //             <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
// //             <p className="mt-1 text-sm text-gray-500">
// //               Get started by creating your first event.
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };


// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { authService } from '../../services/authService';
// import { eventService } from '../../services/eventService';
// import { StatsCard } from '../../components/dashboard/StatsCard';
// import { EventCard } from '../../components/events/EventCard';
// import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// import { Link } from 'react-router-dom';
// import type { DashboardStats, Event } from '../../types';
// import {
//   UsersIcon,
//   CalendarIcon,
//   CheckCircleIcon,
//   ClockIcon,
//   AcademicCapIcon,
//   XCircleIcon,
//   BuildingOffice2Icon,
//   BuildingOfficeIcon,
// } from '@heroicons/react/24/outline';
// import toast from 'react-hot-toast';

// // NEW: import your constants so we can map code → label
// import { DEPARTMENTS, ORGANIZATIONS } from '../../utils/constants';

// export const DashboardPage: React.FC = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState<DashboardStats>({} as DashboardStats);
//   const [recentEvents, setRecentEvents] = useState<Event[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [statsData, eventsData] = await Promise.all([
//           authService.getDashboardStats(),
//           eventService.getEvents(),
//         ]);
//         setStats(statsData as DashboardStats);
//         setRecentEvents((eventsData || []).slice(0, 6));
//       } catch (error) {
//         console.error('Dashboard data fetch error:', error);
//         toast.error('Failed to load dashboard data');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   const handleRegister = async (eventId: number) => {
//     try {
//       await eventService.registerForEvent(eventId);
//       toast.success('Registration successful!');
//       const eventsData = await eventService.getEvents();
//       setRecentEvents((eventsData || []).slice(0, 6));
//     } catch (error: any) {
//       toast.error(error?.response?.data?.error || 'Registration failed');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-96 items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   const StatGrid: React.FC<{ children: React.ReactNode; cols?: string }> = ({
//     children,
//     cols,
//   }) => (
//     <div
//       className={
//         cols ?? 'grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8'
//       }
//     >
//       {children}
//     </div>
//   );

//   const renderStatsForRole = () => {
//     // ADMIN
//     if (user?.role === 'Admin') {
//       return (
//         <StatGrid>
//           <StatsCard
//             title="Total Users"
//             value={stats.total_users ?? 0}
//             icon={<UsersIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Total Students"
//             value={stats.total_students ?? 0}
//             icon={<AcademicCapIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Departments"
//             value={stats.total_departments ?? 0}
//             icon={<BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Organizations"
//             value={stats.total_organization ?? 0}
//             icon={<BuildingOffice2Icon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Total Events"
//             value={stats.total_events ?? 0}
//             icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Approved Events"
//             value={stats.approved_approvals ?? 0}
//             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
//           />
//           <StatsCard
//             title="Pending Approvals"
//             value={stats.pending_approvals ?? 0}
//             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
//           />
//           <StatsCard
//             title="Cancelled"
//             value={stats.cancelled_approvals ?? 0}
//             icon={<XCircleIcon className="h-6 w-6 text-rose-600" />}
//           />
//           <StatsCard
//             title="Completed"
//             value={stats.completed_events ?? 0}
//             icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />}
//           />
//         </StatGrid>
//       );
//     }

//     // STUDENT
//     if (user?.role === 'Student') {
//       return (
//         <StatGrid cols="grid grid-cols-1 gap-5 md:grid-cols-3 mb-8">
//           <StatsCard
//             title="Registered Events"
//             value={stats.registered_events ?? 0}
//             icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Upcoming Events"
//             value={stats.upcoming_events ?? 0}
//             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
//           />
//           <StatsCard
//             title="Certificates Earned"
//             value={stats.certificates_earned ?? 0}
//             icon={<AcademicCapIcon className="h-6 w-6 text-emerald-600" />}
//           />
//         </StatGrid>
//       );
//     }

//     // DEPARTMENT / ORGANIZATION
//     if (user?.role === 'Department' || user?.role === 'Organization') {
//       return (
//         <StatGrid>
//           <StatsCard
//             title="Created Events"
//             value={stats.created_events ?? 0}
//             icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Approved Events"
//             value={stats.approved_events ?? 0}
//             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
//           />
//           <StatsCard
//             title="Pending Events"
//             value={stats.pending_events ?? 0}
//             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
//           />
//           <StatsCard
//             title="Cancelled Events"
//             value={stats.cancelled_events ?? 0}
//             icon={<XCircleIcon className="h-6 w-6 text-rose-600" />}
//           />
//           <StatsCard
//             title="Completed Events"
//             value={stats.completed_events ?? 0}
//             icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />}
//           />
//         </StatGrid>
//       );
//     }

//     // CAMPUS-CHIEF
//     if (user?.role === 'Campus-cheif') {
//       return (
//         <StatGrid>
//           <StatsCard
//             title="Pending Approvals"
//             value={stats.pending_approvals ?? 0}
//             icon={<ClockIcon className="h-6 w-6 text-yellow-600" />}
//           />
//           <StatsCard
//             title="Approved Events"
//             value={stats.approved_events ?? 0}
//             icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
//           />
//           <StatsCard
//             title="Rejected Events"
//             value={stats.rejected_events ?? 0}
//             icon={<XCircleIcon className="h-6 w-6 text-rose-600" />}
//           />
//           <StatsCard
//             title="Cancelled Events"
//             value={stats.cancelled_events ?? 0}
//             icon={<XCircleIcon className="h-6 w-6 text-rose-600" />}
//           />
//           <StatsCard
//             title="Completed Events"
//             value={stats.completed_events ?? 0}
//             icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />}
//           />
//           <StatsCard
//             title="Total Users"
//             value={stats.total_users ?? 0}
//             icon={<UsersIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Total Students"
//             value={stats.total_students ?? 0}
//             icon={<AcademicCapIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Departments"
//             value={stats.total_departments ?? 0}
//             icon={<BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Organizations"
//             value={stats.total_organization ?? 0}
//             icon={<BuildingOffice2Icon className="h-6 w-6 text-indigo-600" />}
//           />
//           <StatsCard
//             title="Total Events"
//             value={stats.total_events ?? 0}
//             icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />}
//           />
//         </StatGrid>
//       );
//     }

//     return null;
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         {/* NEW: Greeting now includes Org/Dept label if applicable */}
//         <h1 className="text-3xl font-bold text-gray-900">
//           Welcome back, {user?.username}
//           {user?.role === 'Organization' && user?.organization
//             ? (() => {
//                 const found = ORGANIZATIONS.find(
//                   (o) => o.value === user.organization
//                 );
//                 return found ? ` (${found.label})` : '';
//               })()
//             : user?.role === 'Department' && user?.department
//             ? (() => {
//                 const found = DEPARTMENTS.find(
//                   (d) => d.value === user.department
//                 );
//                 return found ? ` (${found.label})` : '';
//               })()
//             : ''}!
//         </h1>
//         <p className="mt-2 text-gray-600">
//           Here’s what’s happening with your events today.
//         </p>
//       </div>

//       {renderStatsForRole()}

//       <div>
//         <div className="mb-6 flex items-center justify-between">
//           <h2 className="text-xl font-semibold text-gray-900">Recent Events</h2>
//           <Link
//             to="/events"
//             className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
//           >
//             View all events →
//           </Link>
//         </div>

//         {recentEvents.length > 0 ? (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {recentEvents.map((event) => (
//               <EventCard
//                 key={event.id}
//                 event={event}
//                 onRegister={user?.role === 'Student' ? handleRegister : undefined}
//                 showActions={true}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="py-12 text-center">
//             <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Get started by creating your first event.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { eventService } from '../../services/eventService';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { EventCard } from '../../components/events/EventCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import type { DashboardStats, Event } from '../../types';
import {
  UsersIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  XCircleIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// NEW: import constants for mapping codes to labels
import { DEPARTMENTS, ORGANIZATIONS } from '../../utils/constants';

// NEW: normalize role
const roleOf = (r?: string) => (r || '').trim().toLowerCase();

// NEW: robust mapper — handles code ("it_alliance"), label ("Information Technology Alliance"),
// and casing/space/underscore variations.
function mapCodeOrLabelToLabel(
  raw: string | undefined,
  list: { value: string; label: string }[]
): string {
  if (!raw) return '';
  const s = raw.trim();
  if (!s) return '';

  const byValue = list.find((i) => i.value === s);
  if (byValue) return byValue.label;

  const norm = (x: string) => x.replace(/\s+/g, '_').toLowerCase();
  const byLooseValue = list.find((i) => norm(i.value) === norm(s));
  if (byLooseValue) return byLooseValue.label;

  const byLabel = list.find((i) => i.label === s);
  if (byLabel) return byLabel.label;

  const byLabelLoose = list.find((i) => i.label.toLowerCase() === s.toLowerCase());
  if (byLabelLoose) return byLabelLoose.label;

  // looks like a human label? show as-is
  if (/\s/.test(s) || /[A-Z]/.test(s)) return s;

  return '';
}

// NEW: in case backend uses different keys for org/dept
function getOrgRaw(u: any): string | undefined {
  return u?.organization ?? u?.organization_name ?? u?.org_name ?? u?.org ?? u?.profile?.organization;
}
function getDeptRaw(u: any): string | undefined {
  return u?.department ?? u?.department_name ?? u?.dept_name ?? u?.profile?.department;
}

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({} as DashboardStats);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, eventsData] = await Promise.all([
          authService.getDashboardStats(),
          eventService.getEvents(),
        ]);
        setStats(statsData as DashboardStats);
        setRecentEvents((eventsData || []).slice(0, 6));
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // NEW: quick one-time debug – remove after you verify.
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('DEBUG (Dashboard):', {
      role: user?.role,
      organizationRaw: getOrgRaw(user),
      departmentRaw: getDeptRaw(user),
    });
  }, [user?.role, user?.organization, user?.department]);

  const handleRegister = async (eventId: number) => {
    try {
      await eventService.registerForEvent(eventId);
      toast.success('Registration successful!');
      const eventsData = await eventService.getEvents();
      setRecentEvents((eventsData || []).slice(0, 6));
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Registration failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const StatGrid: React.FC<{ children: React.ReactNode; cols?: string }> = ({
    children,
    cols,
  }) => (
    <div className={cols ?? 'grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8'}>
      {children}
    </div>
  );

  const renderStatsForRole = () => {
    // ADMIN
    if (user?.role === 'Admin') {
      return (
        <StatGrid>
          <StatsCard title="Total Users" value={stats.total_users ?? 0} icon={<UsersIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Total Students" value={stats.total_students ?? 0} icon={<AcademicCapIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Departments" value={stats.total_departments ?? 0} icon={<BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Organizations" value={stats.total_organization ?? 0} icon={<BuildingOffice2Icon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Total Events" value={stats.total_events ?? 0} icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Approved Events" value={stats.approved_approvals ?? 0} icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />} />
          <StatsCard title="Pending Approvals" value={stats.pending_approvals ?? 0} icon={<ClockIcon className="h-6 w-6 text-yellow-600" />} />
          <StatsCard title="Cancelled" value={stats.cancelled_approvals ?? 0} icon={<XCircleIcon className="h-6 w-6 text-rose-600" />} />
          <StatsCard title="Completed" value={stats.completed_events ?? 0} icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />} />
        </StatGrid>
      );
    }

    // STUDENT
    if (user?.role === 'Student') {
      return (
        <StatGrid cols="grid grid-cols-1 gap-5 md:grid-cols-3 mb-8">
          <StatsCard title="Registered Events" value={stats.registered_events ?? 0} icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Upcoming Events" value={stats.upcoming_events ?? 0} icon={<ClockIcon className="h-6 w-6 text-yellow-600" />} />
          <StatsCard title="Certificates Earned" value={stats.certificates_earned ?? 0} icon={<AcademicCapIcon className="h-6 w-6 text-emerald-600" />} />
        </StatGrid>
      );
    }

    // DEPARTMENT / ORGANIZATION
    if (user?.role === 'Department' || user?.role === 'Organization') {
      return (
        <StatGrid>
          <StatsCard title="Created Events" value={stats.created_events ?? 0} icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Approved Events" value={stats.approved_events ?? 0} icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />} />
          <StatsCard title="Pending Events" value={stats.pending_events ?? 0} icon={<ClockIcon className="h-6 w-6 text-yellow-600" />} />
          <StatsCard title="Cancelled Events" value={stats.cancelled_events ?? 0} icon={<XCircleIcon className="h-6 w-6 text-rose-600" />} />
          <StatsCard title="Completed Events" value={stats.completed_events ?? 0} icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />} />
        </StatGrid>
      );
    }

    // CAMPUS-CHIEF
    if (user?.role === 'Campus-cheif') {
      return (
        <StatGrid>
          <StatsCard title="Pending Approvals" value={stats.pending_approvals ?? 0} icon={<ClockIcon className="h-6 w-6 text-yellow-600" />} />
          <StatsCard title="Approved Events" value={stats.approved_events ?? 0} icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />} />
          <StatsCard title="Rejected Events" value={stats.rejected_events ?? 0} icon={<XCircleIcon className="h-6 w-6 text-rose-600" />} />
          <StatsCard title="Cancelled Events" value={stats.cancelled_events ?? 0} icon={<XCircleIcon className="h-6 w-6 text-rose-600" />} />
          <StatsCard title="Completed Events" value={stats.completed_events ?? 0} icon={<CheckCircleIcon className="h-6 w-6 text-sky-600" />} />
          <StatsCard title="Total Users" value={stats.total_users ?? 0} icon={<UsersIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Total Students" value={stats.total_students ?? 0} icon={<AcademicCapIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Departments" value={stats.total_departments ?? 0} icon={<BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Organizations" value={stats.total_organization ?? 0} icon={<BuildingOffice2Icon className="h-6 w-6 text-indigo-600" />} />
          <StatsCard title="Total Events" value={stats.total_events ?? 0} icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />} />
        </StatGrid>
      );
    }

    return null;
  };

  // NEW: compute the label once. If org/dept is missing in `user`, this will be empty.
  const r = roleOf(user?.role);
  const affiliationLabel =
    r === 'organization'
      ? mapCodeOrLabelToLabel(getOrgRaw(user), ORGANIZATIONS)
      : r === 'department'
      ? mapCodeOrLabelToLabel(getDeptRaw(user), DEPARTMENTS)
      : '';

  return (
    <div className="space-y-8">
      <div>
        {/* NEW: Greeting now supports Organization & Department */}
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.username}
          {affiliationLabel ? ` (${affiliationLabel})` : ''}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here’s what’s happening with your events today.
        </p>
      </div>

      {renderStatsForRole()}

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Events</h2>
          <Link to="/events" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all events →
          </Link>
        </div>

        {recentEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={user?.role === 'Student' ? handleRegister : undefined}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first event.</p>
          </div>
        )}
      </div>
    </div>
  );
};