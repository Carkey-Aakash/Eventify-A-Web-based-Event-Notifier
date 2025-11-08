import api from '../utils/api';
import type { Notification } from '../types';

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get('/notifications/');
    return Array.isArray(response.data) ? response.data : [];
  },

  // async markAsRead(id: number) {
  //   const response = await api.patch(`/notifications/${id}/`, { is_read: true });
  //   return response.data;
  // },
   async markAsRead(id: number) {
    await api.post(`/notifications/${id}/mark-read/`);
    // no body needed; backend returns 200 on success
  },
};