// import axios from 'axios';

// const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
// const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api/v1';

// const api = axios.create({
//   baseURL: `${API_BASE}${API_PREFIX}/`, // <-- prefix lives here (with trailing slash)
//   withCredentials: false,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers = config.headers ?? {};
//       (config.headers as Record<string, string>).Authorization = `Token ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;



// src/utils/api.ts
import axios, { AxiosError } from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api/v1';

const api = axios.create({
  baseURL: `${API_BASE}${API_PREFIX}/`,
  withCredentials: false,
  // ADDED: Prefer JSON responses from DRF/Django
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // some Django views use this hint
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Keep your token logic
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization = `Token ${token}`;
    }

    // ADDED: Correct headers for JSON vs FormData
    // - If sending FormData (file uploads), DO NOT set Content-Type.
    //   Axios/browser will set the proper multipart boundary.
    // - Otherwise default to application/json.
    if (config.data instanceof FormData) {
      if (config.headers) {
        delete (config.headers as Record<string, string>)['Content-Type'];
      }
    } else {
      config.headers = config.headers ?? {};
      if (!(config.headers as Record<string, string>)['Content-Type']) {
        (config.headers as Record<string, string>)['Content-Type'] = 'application/json';
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    // Keep your 401 handling
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // ADDED: If server returned an HTML error page (e.g., <!DOCTYPE ...>),
    // normalize it so the frontend toasts don’t break.
    const ct = error.response?.headers?.['content-type'];
    const body = error.response?.data;

    const looksLikeHtml =
      typeof body === 'string' &&
      (body.startsWith('<!DOCTYPE') || body.startsWith('<html')) ||
      (typeof ct === 'string' && ct.includes('text/html'));

    if (looksLikeHtml && error.response) {
      // Replace the raw HTML with a safer shape the UI can display
      const snippet =
        typeof body === 'string' ? body.slice(0, 300) + '…' : '<html>…</html>';
      error.response.data = {
        message:
          'The server returned an unexpected HTML error page. Please check server logs.',
        hint:
          'This often happens when multipart/form-data is mis-set or the view raised an unhandled exception.',
        preview: snippet,
        status: error.response.status,
      };
    }

    return Promise.reject(error);
  }
);

export default api;