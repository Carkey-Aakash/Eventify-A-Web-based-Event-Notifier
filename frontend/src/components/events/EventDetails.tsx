
// frontend/src/components/events/EventDetails.tsx
import React, { useMemo, useState } from 'react';
import type { Event, User } from '../../types';
import { useNavigate } from 'react-router-dom'; // NEW: navigate after delete / to edit page
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { formatDateTime, getEventTypeIcon } from '../../utils/helpers';
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserIcon,
  QrCodeIcon,
  ChartBarIcon,
  StarIcon, // used by feedback button
  PencilSquareIcon, // NEW: edit button icon
  TrashIcon, // NEW: delete button icon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { eventService } from '../../services/eventService';
import { RATING_CHOICES } from '../../utils/constants'; // ratings text

type Stats = {
  event_title: string;
  total_registrations: number;
  confirmed_registrations: number;
  attended_count: number;
  attendance_rate: number;
  feedback_count: number;
  feedback_rate: number;
  average_rating: number;
  average_content_rating: number;
  average_organization_rating: number;
};

interface EventDetailsProps {
  event: Event;
  user: User;
  onRegister?: () => void;
  onCancel?: () => void;
  onApprove?: (status: 'approved' | 'rejected' | 'cancelled', comments?: string) => void;
  isRegistering?: boolean;
  isApproving?: boolean;
}

const statusVariant = (
  s: string
): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
  const map: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
    approved: 'success',
    confirmed: 'success',
    pending: 'warning',
    rejected: 'danger',
    cancelled: 'danger',
    completed: 'info',
  };
  return map[s] ?? 'default';
};

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  user,
  onRegister,
  onCancel,
  onApprove,
  isRegistering = false,
  isApproving = false,
}) => {
  const navigate = useNavigate(); // NEW

  // approval modal
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalStatus, setApprovalStatus] =
    useState<'approved' | 'rejected' | 'cancelled'>('approved');
  const [comments, setComments] = useState('');

  // feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [contentRating, setContentRating] = useState<number>(5);
  const [orgRating, setOrgRating] = useState<number>(5);
  const [fbComments, setFbComments] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [recommend, setRecommend] = useState(true);

  // stats modal
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  // permissions / capabilities
  const canRegister =
    user.role === 'Student' &&
    event.is_registration_open &&
    event.status === 'approved' &&
    !event.registration_status;

  const canCancel = user.role === 'Student' && event.registration_status === 'confirmed';
  // const canApprove = user.role === 'Campus-cheif' && event.status === 'pending';
  const canApprove =
  user.role === 'Campus-cheif' &&
  ['pending', 'cancelled'].includes(event.status);

  const canGiveFeedback =
    user.role === 'Student' &&
    event.status === 'completed' &&
    event.attended === true &&
    event.feedback_given !== true;

  // NEW: who can manage (edit/delete)
  const canManage =
    user?.id === (event as any).organizer ||
    user?.role === 'Admin';

  // organizer/admin can see QR; backend already hides these fields for others
  const canSeeQR = Boolean(event.qr_code || event.qr_code_data);
  const canSeeStats =
    user.id === (event as any).organizer || user.role === 'Admin' || user.role === 'Campus-cheif';

  // attendance URL for QR link
  const apiBase = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000';
  const apiPrefix = (import.meta.env.VITE_API_PREFIX as string) || '/api/v1';
  const attendanceUrl = useMemo(() => {
    if (!event.qr_code_data) return '';
    return `${apiBase}${apiPrefix}/events/attendance/verify/?event_id=${event.id}&qr=${event.qr_code_data}`;
  }, [apiBase, apiPrefix, event.id, event.qr_code_data]);

  // handlers
  const handleApproval = () => {
    if (onApprove) {
      onApprove(approvalStatus, comments);
      setShowApprovalModal(false);
      setComments('');
    }
  };

  const openFeedback = () => setShowFeedbackModal(true);

  const submitFeedback = async () => {
    if (!event) return;
    setSubmittingFeedback(true);
    try {
      await eventService.submitFeedback(event.id, {
        rating,
        content_quality_rating: contentRating,
        organization_rating: orgRating,
        comments: fbComments,
        suggestions,
        would_recommend: recommend,
      });
      toast.success('Thanks for your feedback!');
      setShowFeedbackModal(false);
    } catch (e: any) {
      const msg =
        e?.response?.data?.error ||
        Object.values(e?.response?.data || {}).flat().join(', ') ||
        'Failed to submit feedback';
      toast.error(msg);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const openStats = async () => {
    if (!event) return;
    setShowStatsModal(true);
    setLoadingStats(true);
    setStats(null);
    try {
      const s = await eventService.getStatistics(event.id);
      setStats(s);
    } catch (e: any) {
      toast.error(e?.response?.data?.error || 'Failed to load statistics');
      setShowStatsModal(false);
    } finally {
      setLoadingStats(false);
    }
  };

  // NEW: edit/delete helpers for organizers/admin/chief
  const goEdit = () => {
    // assumes you have a route like /events/:id/edit that reuses EventForm in edit mode
    navigate(`/events/${event.id}/edit`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this event? This cannot be undone.')) return;
    try {
      await eventService.deleteEvent(event.id); // calls /events/:id/manage/ per your service
      toast.success('Event deleted');
      navigate('/events');
    } catch (e: any) {
      const msg = e?.response?.data?.error || 'Failed to delete event';
      toast.error(msg);
    }
  };

  // NEW: tiny busy flag so users can’t double-click while confirming/awaiting
  const [confirmBusy, setConfirmBusy] = useState(false);

  // NEW: confirm wrapper for register
  const handleRegisterClick = async () => {
    if (!onRegister) return;
    if (confirmBusy) return;
    const ok = window.confirm(`Are you sure you want to register for "${event.title}"?`);
    if (!ok) return;
    try {
      setConfirmBusy(true);
      await onRegister(); // uses your existing prop callback (unchanged)
    } finally {
      setConfirmBusy(false);
    }
  };

  // NEW: confirm wrapper for cancel
  const handleCancelClick = async () => {
    if (!onCancel) return;
    if (confirmBusy) return;
    const ok = window.confirm(
      `Are you sure you want to cancel your registration for "${event.title}"?`
    );
    if (!ok) return;
    try {
      setConfirmBusy(true);
      await onCancel(); // uses your existing prop callback (unchanged)
    } finally {
      setConfirmBusy(false);
    }
  };

  return (
    // <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
    //   {/* Poster */}
    //   {event.poster && (
    //     <div className="aspect-video w-full overflow-hidden">
    //       {/* tip: use object-contain if you want the entire small poster visible without cropping */}
    //       <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
    //     </div>

    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
  {/* Poster */}
  {event.poster && (
    <div className="w-full flex justify-center bg-black">
      <img
        src={event.poster}
        alt={event.title}
        className="w-full h-auto object-contain"
      />
    </div>
    
      )}

      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-100 dark:border-neutral-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{getEventTypeIcon(event.event_type)}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{event.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                {event.event_type.replace('_', ' ')} • {event.event_level.replace('_', ' ')} level
              </p>
            </div>
          </div>
          <Badge variant={statusVariant(event.status)}>
            {event.status[0].toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div className="text-gray-800 dark:text-gray-100 leading-relaxed">{event.description}</div>

        {/* Meta grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start text-sm">
              <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  Start: {formatDateTime(event.start_date)}
                </div>
                <div className="text-gray-700 dark:text-gray-200">
                  End: {formatDateTime(event.end_date)}
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
              <span className="text-gray-800 dark:text-gray-100">{event.venue}</span>
            </div>

            <div className="flex items-center text-sm">
              <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
              <span className="text-gray-800 dark:text-gray-100">
                {event.available_slots} / {event.max_participants ?? '—'} slots available
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
              <span className="text-gray-800 dark:text-gray-100">
                {event.registration_deadline
                  ? `Registration closes: ${formatDateTime(event.registration_deadline)}`
                  : event.event_level === 'class'
                  ? 'No registration required for class-level events'
                  : 'Registration deadline not set'}
              </span>
            </div>

            <div className="flex items-center text-sm">
              <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
              <span className="text-gray-800 dark:text-gray-100">
                Organized by: {event.organizer_name}
              </span>
            </div>

            {event.is_paid_event && (
              <div className="flex items-center text-sm">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span className="text-gray-800 dark:text-gray-100">Fee: Rs. {event.registration_fee}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status comments */}
        {event.status_comments && (
          <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-xl p-4 border border-gray-200 dark:border-neutral-700">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1.5">Status Comments</h4>
            <p className="text-sm text-gray-800 dark:text-gray-200">{event.status_comments}</p>
          </div>
        )}

        {/* Attendance QR (only if backend exposes it to this user) */}
        {canSeeQR && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCodeIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Attendance QR</h4>
              </div>
              {attendanceUrl && (
                <a
                  href={attendanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:opacity-80"
                >
                  Open attendance page
                </a>
              )}
            </div>
            <div className="mt-3 flex items-center gap-4">
              {event.qr_code && (
                <img
                  src={event.qr_code}
                  alt="Attendance QR"
                  className="w-40 h-40 rounded-md border border-gray-200 dark:border-neutral-700"
                />
              )}
              <div className="text-xs text-gray-700 dark:text-gray-200 break-all">
                {attendanceUrl ? (
                  <>
                    <div className="font-medium">Scan during event time</div>
                    <div>{attendanceUrl}</div>
                  </>
                ) : (
                  <div>QR is ready for scanning.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action bar */}
        <div className="flex flex-wrap gap-3">
          {canRegister && (
            <Button
              onClick={handleRegisterClick} // NEW
              loading={isRegistering || confirmBusy} // NEW: combine existing + local
              className="w-full sm:w-auto"
            >
              Register for Event
            </Button>
          )}

          {canCancel && (
            <Button
              variant="danger"
              onClick={handleCancelClick} // NEW
              disabled={confirmBusy} // NEW: optional — block while confirming
              className="w-full sm:w-auto"
            >
              Cancel Registration
            </Button>
          )}

          {/* {canApprove && (
            <Button onClick={() => setShowApprovalModal(true)} className="w-full sm:w-auto">
              Review Event
            </Button>
          )}

          {canSeeStats && (
            <Button
              variant="secondary"
              onClick={openStats}
              className="inline-flex items-center gap-2 w-full sm:w-auto"
            >
              <ChartBarIcon className="h-4 w-4" />
              View Statistics
            </Button>
          )} */}

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {canApprove && (
              <Button
                variant="secondary"
                onClick={() => setShowApprovalModal(true)}
                className="flex items-center justify-center gap-2 w/full sm:w-auto 
                 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold 
                 px-6 py-2 rounded-xl shadow-md transition-all duration-200"
              >
                <span>📝</span>
                Review Event
              </Button>
            )}

            {canSeeStats && (
              <Button
                variant="secondary"
                onClick={openStats}
                className="flex items-center justify-center gap-2 w-full sm:w-auto 
                 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold 
                 px-6 py-2 rounded-xl shadow-md transition-all duration-200"
              >
                <ChartBarIcon className="h-5 w-5 text-primary-600" />
                View Statistics
              </Button>
            )}
          </div>

          {/* Feedback button */}
          {canGiveFeedback && (
            <Button
              onClick={openFeedback}
              className="inline-flex items-center gap-2 w-full sm:w-auto"
            >
              <StarIcon className="h-4 w-4" />
              Give Feedback
            </Button>
          )}

          {/* Manage actions for organizer/admin/chief */}
          {canManage && (
            <>
              <Button
                variant="secondary"
                onClick={goEdit}
                className="inline-flex items-center gap-2 w-full sm:w-auto"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit
              </Button>

              <Button
                variant="danger"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 w-full sm:w-auto"
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </Button>
            </>
          )}

          {event.registration_status === 'confirmed' && <Badge variant="success">You are registered</Badge>}
          {event.attended && <Badge variant="info">Attended</Badge>}
          {event.feedback_given && <Badge variant="info">Feedback given</Badge>}
        </div>
      </div>

      {/* Approval Modal */}
      <Modal isOpen={showApprovalModal} onClose={() => setShowApprovalModal(false)} title="Review Event">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Decision</label>
            <select
              value={approvalStatus}
              onChange={(e) => setApprovalStatus(e.target.value as 'approved' | 'rejected' | 'cancelled')}
              className="block w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="approved">Approve</option>
              <option value="rejected">Reject</option>
              <option value="cancelled">Cancel</option>
            </select>
          </div>

          {(approvalStatus === 'rejected' || approvalStatus === 'cancelled') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Comments (Required)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                className="block w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Provide reason for rejection/cancellation..."
              />
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleApproval}
              loading={isApproving}
              disabled={(approvalStatus === 'rejected' || approvalStatus === 'cancelled') && !comments.trim()}
            >
              Submit Decision
            </Button>
          </div>
        </div>
      </Modal>

      {/* Feedback Modal */}
      <Modal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} title="Give Feedback">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Overall Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="block w-full rounded-md border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
              >
                {RATING_CHOICES.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Content Quality
              </label>
              <select
                value={contentRating}
                onChange={(e) => setContentRating(Number(e.target.value))}
                className="block w/full rounded-md border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
              >
                {RATING_CHOICES.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Organization
              </label>
              <select
                value={orgRating}
                onChange={(e) => setOrgRating(Number(e.target.value))}
                className="block w-full rounded-md border-gray-300 dark:border-neutral-700 bg-white white:bg-neutral-900 text-sm"
              >
                {RATING_CHOICES.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Comments</label>
            <textarea
              value={fbComments}
              onChange={(e) => setFbComments(e.target.value)}
              rows={3}
              className="block w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="What went well? What could improve?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Suggestions</label>
            <textarea
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              rows={2}
              className="block w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={recommend}
              onChange={(e) => setRecommend(e.target.checked)}
              className="rounded border-gray-300 dark:border-neutral-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-800 dark:text-gray-200">I would recommend this event</span>
          </label>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowFeedbackModal(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600" // ★ Add background and hover for visibility
            >
              Close
            </Button>
            <Button
              onClick={submitFeedback}
              loading={submittingFeedback}
              className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400" // ★ Primary color for submit
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </Modal>

      {/* Stats Modal */}
      <Modal isOpen={showStatsModal} onClose={() => setShowStatsModal(false)} title="Event Statistics">
        {loadingStats ? (
          <div className="py-8 text-center text-sm text-gray-600 dark:text-gray-300">Loading…</div>
        ) : stats ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Stat label="Total regs" value={stats.total_registrations} />
              <Stat label="Confirmed" value={stats.confirmed_registrations} />
              <Stat label="Attended" value={stats.attended_count} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Stat label="Attendance rate" value={`${stats.attendance_rate.toFixed(1)}%`} />
              <Stat label="Feedbacks" value={stats.feedback_count} />
              <Stat label="Feedback rate" value={`${stats.feedback_rate.toFixed(1)}%`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Stat label="Avg rating" value={stats.average_rating.toFixed(2)} />
              <Stat label="Content avg" value={stats.average_content_rating.toFixed(2)} />
              <Stat label="Organization avg" value={stats.average_organization_rating.toFixed(2)} />
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-gray-600 dark:text-gray-300">No data.</div>
        )}
      </Modal>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 dark:border-neutral-700 p-4">
    <div className="text-xs text-gray-600 dark:text-gray-300">{label}</div>
    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</div>
  </div>
);