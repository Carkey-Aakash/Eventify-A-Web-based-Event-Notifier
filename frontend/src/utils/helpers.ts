import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, isValid } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, formatStr) : 'Invalid date';
  } catch {
    return 'Invalid date';
  }
}

export function formatDateTime(dateString: string): string {
  return formatDate(dateString, 'MMM dd, yyyy • hh:mm a');
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
    completed: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    draft: 'bg-gray-100 text-gray-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

export function getEventTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    technical: '💻',
    non_technical: '📚',
    workshop: '🔧',
    seminar: '🎓',
    competition: '🏆',
    cultural: '🎭',
    sports: '⚽',
    others: '📋',
  };
  return icons[type] || '📋';
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRoleDisplayName(role: string): string {
  const roleNames: Record<string, string> = {
    'Student': 'Student',
    'Department': 'Department',
    'Organization': 'Organization',
    'Campus-cheif': 'Campus Chief',
    'Admin': 'Administrator',
  };
  return roleNames[role] || role;
}