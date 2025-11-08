// // import React, { useEffect, useState } from 'react';
// // import { notificationService } from '../../services/notificationService';
// // import type { Notification } from '../../types';
// // import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// // import { formatDateTime } from '../../utils/helpers';
// // import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';
// // import toast from 'react-hot-toast';

// // export const NotificationsPage: React.FC = () => {
// //   const [notifications, setNotifications] = useState<Notification[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchNotifications = async () => {
// //       try {
// //         const data = await notificationService.getNotifications();
// //         setNotifications(data);
// //       } catch (error) {
// //         console.error('Notifications fetch error:', error);
// //         toast.error('Failed to load notifications');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchNotifications();
// //   }, []);

// //   const handleMarkAsRead = async (id: number) => {
// //     try {
// //       await notificationService.markAsRead(id);
// //       setNotifications(prev =>
// //         prev.map(notif =>
// //           notif.id === id ? { ...notif, is_read: true } : notif
// //         )
// //       );
// //     } catch (error) {
// //       console.error('Mark as read error:', error);
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-96">
// //         <LoadingSpinner size="lg" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //       {/* Title row */}
// //       <div className="flex items-center gap-3 mb-8">
// //         <h1 className="text-3xl font-bold text-gray-900 white:text-white">Notifications</h1>
// //         <BellIcon className="w-8 h-8 text-indigo-500" aria-label="Notifications" />
// //       </div>

// //       {notifications.length > 0 ? (
// //         <div className="space-y-6">
// //           {notifications.map((notification) => (
// //             <div
// //               key={notification.id}
// //               className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 ${
// //                 !notification.is_read ? 'border-l-4 border-l-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/20' : ''
// //               }`}
// //             >
// //               <div className="flex items-start justify-between">
// //                 <div className="flex items-start gap-3 flex-1">
// //                   <div className={`p-2 rounded-lg ${
// //                     !notification.is_read ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'bg-gray-100 dark:bg-gray-800'
// //                   }`}>
// //                     <BellIcon className={`h-6 w-6 ${
// //                       !notification.is_read ? 'text-indigo-600' : 'text-gray-400 dark:text-gray-500'
// //                     }`} />
// //                   </div>
// //                   <div className="flex-1">
// //                     <h3 className={`text-lg font-medium ${
// //                       !notification.is_read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
// //                     }`}>
// //                       {notification.title}
// //                     </h3>
// //                     <div className={`mt-1 text-sm ${
// //                       !notification.is_read ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'
// //                     }`}>
// //                       {notification.message.split('\n').map((line, index) => (
// //                         <p key={index} className={index > 0 ? 'mt-1' : ''}>
// //                           {line}
// //                         </p>
// //                       ))}
// //                     </div>
// //                     <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
// //                       <span>{formatDateTime(notification.created_at)}</span>
// //                       {notification.event_title && (
// //                         <span>• Event: {notification.event_title}</span>
// //                       )}
// //                       <span>• {notification.notification_type.replace('_', ' ')}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 {!notification.is_read && (
// //                   <button
// //                     onClick={() => handleMarkAsRead(notification.id)}
// //                     className="ml-4 p-2 text-gray-400 hover:text-indigo-600 transition-colors"
// //                     title="Mark as read"
// //                   >
// //                     <CheckIcon className="h-5 w-5" />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="flex items-center justify-center min-h-[300px]">
// //           <div className="bg-background dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 w-full max-w-md mx-auto flex flex-col items-center">
// //             <BellIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-4" />
// //             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">You have no notifications yet.</h3>
// //             <p className="text-gray-500 dark:text-gray-400 text-center">
// //               You're all caught up! New notifications will appear here.
// //             </p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };



// import React, { useEffect, useState } from 'react';
// import { notificationService } from '../../services/notificationService';
// import type { Notification } from '../../types';
// import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// import { formatDateTime } from '../../utils/helpers';
// import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';
// import toast from 'react-hot-toast';

// export const NotificationsPage: React.FC = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const data = await notificationService.getNotifications();
//         setNotifications(data);
//       } catch (error) {
//         console.error('Notifications fetch error:', error);
//         toast.error('Failed to load notifications');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const handleMarkAsRead = async (id: number) => {
//     try {
//       await notificationService.markAsRead(id);
//       setNotifications(prev =>
//         prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
//       );
//     } catch (error) {
//       console.error('Mark as read error:', error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-96">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   const unreadCount = notifications.filter(n => !n.is_read).length;

//   return (
//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
//       {/* Heading */}
//       <div className="mb-8 flex items-center gap-3">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900 white:text-gray-100">
//           Notifications
//         </h1>
//         <div className="relative">
//           <BellIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
//           {unreadCount > 0 && (
//             <span
//               className="absolute -right-1 -top-1 rounded-full bg-rose-600 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white"
//               title={`${unreadCount} unread`}
//             >
//               {unreadCount}
//             </span>
//           )}
//         </div>
//       </div>

//       {notifications.length > 0 ? (
//         <ul className="space-y-5">
//           {notifications.map((n) => {
//             const unread = !n.is_read;

//             return (
//               <li key={n.id}>
//                 <article
//                   className={[
//                     'group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all',
//                     'bg-white/90 dark:bg-neutral-900/90',
//                     'border-gray-200 dark:border-neutral-700',
//                     unread
//                       ? 'ring-1 ring-inset ring-indigo-200/70 dark:ring-indigo-500/20'
//                       : 'hover:ring-1 hover:ring-inset hover:ring-gray-200 dark:hover:ring-neutral-700',
//                   ].join(' ')}
//                 >
//                   {/* Unread accent */}
//                   {unread && (
//                     <span className="absolute inset-y-0 left-0 w-1 bg-indigo-500" aria-hidden="true" />
//                   )}

//                   <div className="flex items-start gap-4">
//                     {/* Icon */}
//                     <div
//                       className={[
//                         'shrink-0 rounded-xl p-2.5',
//                         unread
//                           ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300'
//                           : 'bg-gray-100 text-gray-500 dark:bg-neutral-800 dark:text-neutral-400',
//                       ].join(' ')}
//                     >
//                       <BellIcon className="h-6 w-6" aria-hidden="true" />
//                     </div>

//                     {/* Content */}
//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-start justify-between gap-4">
//                         <h3
//                           className={[
//                             'text-lg font-semibold leading-6',
//                             unread
//                               ? 'text-gray-900 dark:text-gray-100'
//                               : 'text-gray-800 dark:text-gray-200',
//                           ].join(' ')}
//                         >
//                           {n.title}
//                         </h3>

//                         {!n.is_read && (
//                           <button
//                             onClick={() => handleMarkAsRead(n.id)}
//                             className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-neutral-400 dark:hover:bg-neutral-800"
//                             title="Mark as read"
//                           >
//                             <CheckIcon className="h-5 w-5" />
//                           </button>
//                         )}
//                       </div>

//                       {/* Message */}
//                       <div
//                         className={[
//                           'mt-1 text-sm',
//                           unread
//                             ? 'text-gray-700 dark:text-gray-200'
//                             : 'text-gray-600 dark:text-gray-300',
//                         ].join(' ')}
//                       >
//                         {n.message.split('\n').map((line, idx) => (
//                           <p key={idx} className={idx > 0 ? 'mt-1' : undefined}>
//                             {line}
//                           </p>
//                         ))}
//                       </div>

//                       {/* Meta */}
//                       <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
//                         <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700 dark:bg-neutral-800 dark:text-gray-300">
//                           {formatDateTime(n.created_at)}
//                         </span>

//                         {n.event_title && (
//                           <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
//                             Event: {n.event_title}
//                           </span>
//                         )}

//                         <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium capitalize text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
//                           {n.notification_type.replace('_', ' ')}
//                         </span>

//                         {unread && (
//                           <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
//                             • Unread
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <div className="flex items-center justify-center min-h-[320px]">
//           <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/90 p-8 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900/90">
//             <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gray-100 dark:bg-neutral-800">
//               <BellIcon className="h-6 w-6 text-gray-500 dark:text-neutral-400" aria-hidden="true" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 white:text-gray-100">
//               You have no notifications yet
//             </h3>
//             <p className="mt-1 text-sm text-gray-600 white:text-gray-400">
//               You’re all caught up! New notifications will appear here.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { notificationService } from '../../services/notificationService';
import type { Notification } from '../../types';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDateTime } from '../../utils/helpers';
import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Notifications fetch error:', error);
        toast.error('Failed to load notifications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      // ✅ Updates the backend first
      await notificationService.markAsRead(id);
      // ✅ Then reflect in UI
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error('Mark as read error:', error);
      toast.error('Failed to mark as read');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Heading */}
      <div className="mb-8 flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 white:text-gray-100">
          Notifications
        </h1>
        <div className="relative">
          <BellIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          {unreadCount > 0 && (
            <span
              className="absolute -right-1 -top-1 rounded-full bg-rose-600 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white"
              title={`${unreadCount} unread`}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {notifications.length > 0 ? (
        <ul className="space-y-5">
          {notifications.map((n) => {
            const unread = !n.is_read;

            return (
              <li key={n.id}>
                <article
                  className={[
                    'group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all',
                    'bg-white/90 dark:bg-neutral-900/90',
                    'border-gray-200 dark:border-neutral-700',
                    unread
                      ? 'ring-1 ring-inset ring-indigo-200/70 dark:ring-indigo-500/20'
                      : 'hover:ring-1 hover:ring-inset hover:ring-gray-200 dark:hover:ring-neutral-700',
                  ].join(' ')}
                >
                  {/* Unread accent */}
                  {unread && (
                    <span className="absolute inset-y-0 left-0 w-1 bg-indigo-500" aria-hidden="true" />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={[
                        'shrink-0 rounded-xl p-2.5',
                        unread
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300'
                          : 'bg-gray-100 text-gray-500 dark:bg-neutral-800 dark:text-neutral-400',
                      ].join(' ')}
                    >
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3
                          className={[
                            'text-lg font-semibold leading-6',
                            unread
                              ? 'text-gray-900 dark:text-gray-100'
                              : 'text-gray-800 dark:text-gray-200',
                          ].join(' ')}
                        >
                          {n.title}
                        </h3>

                        {!n.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(n.id)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-neutral-400 dark:hover:bg-neutral-800"
                            title="Mark as read"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>

                      {/* Message */}
                      <div
                        className={[
                          'mt-1 text-sm',
                          unread
                            ? 'text-gray-700 dark:text-gray-200'
                            : 'text-gray-600 dark:text-gray-300',
                        ].join(' ')}
                      >
                        {n.message.split('\n').map((line, idx) => (
                          <p key={idx} className={idx > 0 ? 'mt-1' : undefined}>
                            {line}
                          </p>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700 dark:bg-neutral-800 dark:text-gray-300">
                          {formatDateTime(n.created_at)}
                        </span>

                        {n.event_title && (
                          <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                            Event: {n.event_title}
                          </span>
                        )}

                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium capitalize text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                          {n.notification_type.replace('_', ' ')}
                        </span>

                        {/* ✅ Status badge: flips to green "Read" after marking */}
                        {n.is_read ? (
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            ✓ Read
                          </span>
                        ) : (
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                            • UnRead
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center min-h-[320px]">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/90 p-8 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900/90">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gray-100 dark:bg-neutral-800">
              <BellIcon className="h-6 w-6 text-gray-500 dark:text-neutral-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 white:text-gray-100">
              You have no notifications yet
            </h3>
            <p className="mt-1 text-sm text-gray-600 white:text-gray-400">
              You’re all caught up! New notifications will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};