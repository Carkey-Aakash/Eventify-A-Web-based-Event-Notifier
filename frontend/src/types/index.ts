export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'Student' | 'Department' | 'Organization' | 'Campus-cheif' | 'Admin';
  department?: string;
  organization?: string;
  gender?: 'Male' | 'Female' | 'Other';
  phone_number?: string;
  student_id?: string;
  profile_picture?: string;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
  profile?: UserProfile;
}

export interface UserProfile {
  bio?: string;
  class_name?: string;
  year?: string;
  semester?: string;
  address?: string;
  interests?: string[];
}

export interface Event {
  id: number;
  title: string;
  description: string;
  event_level: 'class' | 'department' | 'organization' | 'college';
  event_type: 'technical' | 'non_technical' | 'workshop' | 'seminar' | 'competition' | 'cultural' | 'sports' | 'others';
  class_name?: string;
  year?: string;
  semester?: string;
  start_date: string;
  end_date: string;
  venue: string;
  organizer: number;
  organizer_name: string;
  approved_by?: number;
  approved_by_name?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  max_participants: number;
  registration_deadline: string;
  is_paid_event: boolean;
  registration_fee: number;
  poster?: string;
  qr_code?: string;
  qr_code_data?: string;
  status_comments?: string;
  created_at: string;
  updated_at: string;
  registered_count: number;
  available_slots: number;
  is_registration_open: boolean;
  registration_status?: 'pending' | 'confirmed' | 'cancelled' | 'attended';
  attended?: boolean;
  feedback_given?: boolean;
}

export interface EventRegistration {
  id: number;
  event: number;
  event_title: string;
  student_name: string;
  registration_date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'attended';
  payment_status: boolean;
  attended: boolean;
  feedback_given: boolean;
}

export interface EventFeedback {
  id: number;
  event: number;
  event_title: string;
  student_name: string;
  rating: number;
  content_quality_rating: number;
  organization_rating: number;
  comments?: string;
  suggestions?: string;
  would_recommend: boolean;
  created_at: string;
}

export interface Notification {
  id: number;
  recipient: number;
  title: string;
  message: string;
  notification_type: string;
  event?: number;
  event_title?: string;
  created_at: string;
  is_read: boolean;
}

export interface Certificate {
  id: number;
  event: number;
  event_title: string;
  student: number;
  student_name: string;
  issued_at: string;
  certificate_url?: string;
}

export interface DashboardStats {
  total_users?: number;
  total_students?: number;
  total_departments?: number;
  total_organization?: number;
  total_events?: number;
  approved_approvals?: number;
  pending_approvals?: number;
  cancelled_approvals?: number;
  completed_events?: number;
  registered_events?: number;
  upcoming_events?: number;
  certificates_earned?: number;
  created_events?: number;
  pending_events?: number;
  approved_events?: number;
  cancelled_events?: number;
  rejected_events?: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password1: string;
  department?: string;
  organization?: string;
  gender?: string;
  student_id?: string;
  phone_number: string;
  profile_picture?: File;
}

export interface ProfileData {
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
  department?: string;
  organization?: string;
  bio?: string;
  class_name?: string;
  year?: string;
  semester?: string;
  address?: string;
  interests?: string[];
}