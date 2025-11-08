

// src/services/eventService.ts
import api from '../utils/api';
import type { Event, EventRegistration, EventFeedback } from '../types';

// keep poster as a real file/blob or an existing URL string
type EventWithPoster = Omit<Partial<Event>, 'poster'> & { poster?: File | Blob | string };

/** --- API response shapes --- */
export type RegisterResponse = { message: string; registration: EventRegistration };
export type CancelResponse = { message: string };
export type FeedbackResponse = { message: string; feedback: EventFeedback };
export type ApproveResponse = { message: string; event: Event };

export type EventStatistics = {
  event_title: string;
  total_registrations: number;
  confirmed_registrations: number;
  attended_count: number;
  attendance_rate: number; // %
  feedback_count: number;
  feedback_rate: number;   // %
  average_rating: number;
  average_content_rating: number;
  average_organization_rating: number;
};

export type EventConflictRow = {
  id: number;
  event1: number;
  event2: number;
  event1_title: string;
  event2_title: string;
  status: 'detected' | 'resolved' | string;
  detected_at: string;
  resolved_at?: string | null;
};

// robust “is file-like” check
const isFileLike = (v: unknown): v is Blob => {
  if (!v) return false;
  if (typeof Blob !== 'undefined' && v instanceof Blob) return true;
  return typeof (v as any).size === 'number' && typeof (v as any).type === 'string';
};

/** Helpers */
const toFormData = (payload: EventWithPoster | FormData): FormData => {
  if (typeof FormData !== 'undefined' && payload instanceof FormData) return payload;

  const { poster, ...rest } = payload as EventWithPoster;
  const body = new FormData();

  // only append a real file/blob (skip when it's an existing URL string)
  if (isFileLike(poster)) body.append('poster', poster);

  Object.entries(rest).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      v.forEach((item) => body.append(k, String(item)));
    } else {
      body.append(k, String(v));
    }
  });

  return body;
};

export const eventService = {
  /** Lists */
  async getEvents(params?: { level?: string; type?: string; status?: string }): Promise<Event[]> {
    const { data } = await api.get('events/', { params });
    return Array.isArray(data) ? (data as Event[]) : [];
  },

  async getPendingEvents(): Promise<Event[]> {
    const { data } = await api.get('events/pending/');
    return Array.isArray(data) ? (data as Event[]) : [];
  },

  async getCancelledEvents(): Promise<Event[]> {
    const { data } = await api.get('events/cancelled/');
    return Array.isArray(data) ? (data as Event[]) : [];
  },

  async getRejectedEvents(): Promise<Event[]> {
    const { data } = await api.get('events/rejected/');
    return Array.isArray(data) ? (data as Event[]) : [];
  },

  async getCompletedEvents(): Promise<Event[]> {
    const { data } = await api.get('events/completed/');
    return Array.isArray(data) ? (data as Event[]) : [];
  },

  async getMyEvents(): Promise<Event[]> {
    const { data } = await api.get('events/my-events/');
    return Array.isArray(data) ? (data as Event[]) : [];
  },

  /** Detail */
  async getEvent(id: number): Promise<Event> {
    const { data } = await api.get(`events/${id}/`);
    return data as Event;
  },

  /** Create / Update / Delete (organizers) */
  async createEvent(payload: EventWithPoster | FormData): Promise<Event> {
    const body = toFormData(payload);
    // let axios set the multipart boundary
    const { data } = await api.post('events/', body);
    return data as Event;
  },

  // IMPORTANT: use /manage/ for organizer updates
  async updateEvent(id: number, payload: EventWithPoster | FormData): Promise<Event> {
    const body = toFormData(payload);
    const { data } = await api.patch(`events/${id}/manage/`, body);
    return data as Event;
  },

  // IMPORTANT: use /manage/ for organizer deletes
  async deleteEvent(id: number): Promise<void> {
    await api.delete(`events/${id}/manage/`);
  },

  /** Chief approvals */
  async approveEvent(
    id: number,
    payload: { status: 'approved' | 'rejected' | 'cancelled'; status_comments?: string }
  ): Promise<ApproveResponse> {
    const { data } = await api.post(`events/${id}/approve/`, payload);
    return data as ApproveResponse;
  },

  // Backward-compatible name (same response)
  async approveRejectEvent(id: number, status: string, comments?: string): Promise<ApproveResponse> {
    const payload: any = { status };
    if ((status === 'rejected' || status === 'cancelled') && comments) {
      payload.status_comments = comments;
    }
    const { data } = await api.post(`events/${id}/approve/`, payload);
    return data as ApproveResponse;
  },

  /** Registration (students) */
  async registerForEvent(id: number): Promise<RegisterResponse> {
    try {
      const res = await api.post(`events/${id}/register/`);
      return res.data as RegisterResponse;
    } catch (e: any) {
      // NEW: normalize message but keep original axios error object intact
      const backendMsg =
        e?.response?.data?.message || // e.g. "You are already registered for this event."
        e?.response?.data?.error ||
        (typeof e?.message === 'string' ? e.message : 'Registration failed');

      if (e && typeof e === 'object') {
        (e as any).message = backendMsg; // NEW: set friendly message for callers using e.message
      }
      throw e; // NEW: rethrow original error so e.response still exists for callers that use it
    }
  },

  async cancelRegistration(id: number): Promise<CancelResponse> {
    const { data } = await api.post(`events/${id}/cancel-registration/`);
    return data as CancelResponse;
  },

  /** Feedback (students who attended) */
  async submitFeedback(id: number, feedback: Partial<EventFeedback>): Promise<FeedbackResponse> {
    const { data } = await api.post(`events/${id}/feedback/`, feedback);
    return data as FeedbackResponse;
  },

  /** Stats (organizer/admin/chief) */
  async getStatistics(id: number): Promise<EventStatistics> {
    const { data } = await api.get(`events/${id}/statistics/`);
    return data as EventStatistics;
  },

  // Backward-compatible alias
  async getEventStatistics(id: number): Promise<EventStatistics> {
    const { data } = await api.get(`events/${id}/statistics/`);
    return data as EventStatistics;
  },

  /** Conflicts (chief/admin) */
  async getConflicts(): Promise<EventConflictRow[]> {
    const { data } = await api.get('events/conflicts/');
    return Array.isArray(data) ? (data as EventConflictRow[]) : [];
  },

  // Backward-compatible alias
  async getEventConflicts(): Promise<EventConflictRow[]> {
    const { data } = await api.get('events/conflicts/');
    return Array.isArray(data) ? (data as EventConflictRow[]) : [];
  },
};