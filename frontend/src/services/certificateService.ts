import api from '../utils/api';
import  type { Certificate } from '../types';

export const certificateService = {
  async getMyCertificates(): Promise<Certificate[]> {
    const response = await api.get('/certificate/my-certificates/');
    return Array.isArray(response.data) ? response.data : [];
  },
};