// // import EditEventPage from './pages/events/EditEventPage';
// // import EditEventPage from './pages/events/EditEventPage';

// // import './pages/globals.css';
// import { EditEventPage } from './pages/events/EditEventPage';



// import { CompletedEventsPage } from './pages/events/CompletedEventsPage';
// import { CancelledEventsPage } from './pages/events/CancelledEventsPage';
// import { EventConflictsPage } from './pages/events/EventConflictsPage';




// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './contexts/AuthContext';
// import { Layout } from './components/layout/Layout';
// import { ProtectedRoute } from './components/auth/ProtectedRoute';

// // Pages
// import { LoginPage } from './pages/auth/LoginPage';
// import { RegisterPage } from './pages/auth/RegisterPage';
// import { DashboardPage } from './pages/dashboard/DashboardPage';
// import { EventsPage } from './pages/events/EventsPage';
// import { EventDetailPage } from './pages/events/EventDetailPage';
// import { CreateEventPage } from './pages/events/CreateEventPage';
// import { MyEventsPage } from './pages/events/MyEventsPage';
// import { ProfilePage } from './pages/profile/ProfilePage';
// import { NotificationsPage } from './pages/notifications/NotificationsPage';
// import { CertificatesPage } from './pages/certificates/CertificatesPage';
// import { PendingEventsPage } from './pages/events/PendingEventsPage';
// import EventifyLandingPage from './pages/LandingPage';


// // Small helper that performs a hard redirect to the Django reset page
// import ExternalRedirect from './components/ExternalRedirect';

// // Build the Django password reset URL from your envs
// const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';
// const API_PREFIX = (import.meta.env.VITE_API_PREFIX as string) || '';
// // ✅ Correct path is /password-reset/ (NOT /users/password-reset/)
// const PASSWORD_RESET_URL = `${API_BASE}${API_PREFIX}/password-reset/`;

// export default function App() {
//   return (
//     <AuthProvider>
//       {/* Page shell styling (instead of global @apply) */}
//       <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
//         <Routes>
//           {/* Public */}
//           <Route path="/" element={<EventifyLandingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           {/* Opens Django’s password reset form */}
//           <Route path="/forgot-password" element={<ExternalRedirect to={PASSWORD_RESET_URL} />} />

//           {/* Protected */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <DashboardPage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/events"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <EventsPage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/events/:id"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <EventDetailPage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/events/create"
//             element={
//               <ProtectedRoute requiredRoles={['Department', 'Organization']}>
//                 <Layout>
//                   <CreateEventPage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/events/pending"
//             element={
//               <ProtectedRoute requiredRoles={['Campus-cheif', 'Admin', 'Department', 'Organization']}>
//                 <Layout>
//                   <PendingEventsPage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/my-events"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <MyEventsPage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <ProfilePage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/notifications"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <NotificationsPage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/certificates"
//             element={
//               <ProtectedRoute requiredRoles={['Student']}>
//                 <Layout>
//                   <CertificatesPage />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//   path="/events/completed"
//   element={
//     <ProtectedRoute>
//       <Layout>
//         <CompletedEventsPage />
//       </Layout>
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/events/cancelled"
//   element={
//     <ProtectedRoute requiredRoles={['Campus-cheif', 'Admin', 'Department', 'Organization']}>
//       <Layout>
//         <CancelledEventsPage />
//       </Layout>
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/events/conflicts"
//   element={
//     <ProtectedRoute requiredRoles={['Campus-cheif', 'Admin']}>
//       <Layout>
//         <EventConflictsPage />
//       </Layout>
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/events/:id/edit"
//   element={
//     <ProtectedRoute requiredRoles={['Department', 'Organization', 'Admin']}>
//       <Layout>
//         <EditEventPage />
//       </Layout>
//     </ProtectedRoute>
//   }
// />

//           {/* Redirects */}
//           {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>

//         <Toaster position="top-right" />
//       </div>
//     </AuthProvider>
//   );
// }


// import EditEventPage from './pages/events/EditEventPage';
// import EditEventPage from './pages/events/EditEventPage';

// import './pages/globals.css';
import { EditEventPage } from './pages/events/EditEventPage';

import { CompletedEventsPage } from './pages/events/CompletedEventsPage';
import { RejectedEventsPage } from './pages/events/RejectedEventsPage';
import { CancelledEventsPage } from './pages/events/CancelledEventsPage';
import { EventConflictsPage } from './pages/events/EventConflictsPage';

import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext'; // ✅ added

import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { EventsPage } from './pages/events/EventsPage';
import { EventDetailPage } from './pages/events/EventDetailPage';
import { CreateEventPage } from './pages/events/CreateEventPage';
import { MyEventsPage } from './pages/events/MyEventsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { CertificatesPage } from './pages/certificates/CertificatesPage';
import { PendingEventsPage } from './pages/events/PendingEventsPage';
import EventifyLandingPage from './pages/LandingPage';

// Small helper that performs a hard redirect to the Django reset page
import ExternalRedirect from './components/ExternalRedirect';

// Build the Django password reset URL from your envs
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '';
const API_PREFIX = (import.meta.env.VITE_API_PREFIX as string) || '';
// ✅ Correct path is /password-reset/ (NOT /users/password-reset/)
const PASSWORD_RESET_URL = `${API_BASE}${API_PREFIX}/password-reset/`;

// ✅ custom component for catch-all redirect
function NotFoundRedirect() {
  const { user } = useAuth(); // adjust if your context exposes isAuthenticated instead
  const isAuthed = Boolean(user);
  return <Navigate to={isAuthed ? "/dashboard" : "/"} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      {/* Page shell styling (instead of global @apply) */}
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
        <Routes>
          {/* Public */}
          <Route path="/" element={<EventifyLandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Opens Django’s password reset form */}
          <Route path="/forgot-password" element={<ExternalRedirect to={PASSWORD_RESET_URL} />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Layout>
                  <EventsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <EventDetailPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/create"
            element={
              <ProtectedRoute requiredRoles={['Department', 'Organization']}>
                <Layout>
                  <CreateEventPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/pending"
            element={
              <ProtectedRoute requiredRoles={['Campus-cheif', 'Admin', 'Department', 'Organization']}>
                <Layout>
                  <PendingEventsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-events"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyEventsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Layout>
                  <NotificationsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/certificates"
            element={
              <ProtectedRoute requiredRoles={['Student']}>
                <Layout>
                  <CertificatesPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/completed"
            element={
              <ProtectedRoute>
                <Layout>
                  <CompletedEventsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/cancelled"
            element={
              <ProtectedRoute requiredRoles={['Campus-cheif', 'Admin', 'Department', 'Organization']}>
                <Layout>
                  <CancelledEventsPage />
                </Layout>
              </ProtectedRoute>
            }
          />


           <Route
            path="/events/rejected"
            element={
              <ProtectedRoute requiredRoles={['Campus-cheif', 'Admin', 'Department', 'Organization']}>
                <Layout>
                  <RejectedEventsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/conflicts"
            element={
              <ProtectedRoute requiredRoles={['Campus-cheif', 'Admin']}>
                <Layout>
                  <EventConflictsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/:id/edit"
            element={
              <ProtectedRoute requiredRoles={['Department', 'Organization', 'Admin']}>
                <Layout>
                  <EditEventPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirects */}
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>

        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}
