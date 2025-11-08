// import api from '../utils/api';
// import type { User, LoginCredentials, RegisterData, ProfileData } from '../types';
// import { setAuthData, clearAuthData } from '../utils/auth';

// export const authService = {
//   async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
//     const { data } = await api.post('login/', credentials);
//     const token: string = data.token;
//     const user: User =
//       data.user ??
//       ({
//         id: data.id,
//         username: data.username,
//         email: data.email,
//         first_name: data.first_name,
//         last_name: data.last_name,
//         role: data.role,
//         department: data.department,
//         organization: data.organization,
//         gender: data.gender,
//         phone_number: data.phone_number,
//         student_id: data.student_id,
//         profile_picture: data.profile_picture,
//         is_email_verified: data.is_email_verified ?? true,
//         created_at: data.created_at ?? '',
//         updated_at: data.updated_at ?? '',
//         profile: data.profile,
//       } as User);

//     setAuthData(user, token);
//     return { user, token };
//   },

//   async register(payload: RegisterData): Promise<User> {
//     const form = new FormData();
//     Object.entries(payload).forEach(([k, v]) => {
//       if (v === undefined || v === null) return;
//       if (k === 'profile_picture' && v instanceof File) form.append(k, v);
//       else if (Array.isArray(v)) v.forEach((item) => form.append(`${k}[]`, String(item)));
//       else form.append(k, String(v));
//     });

//     const { data } = await api.post('register/', form, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return data as User;
//   },

//   async logout(): Promise<void> {
//     try {
//       await api.post('logout/');
//     } finally {
//       clearAuthData();
//     }
//   },

//   async getProfile(): Promise<User> {
//     const { data } = await api.get('profile/');
//     return data as User;
//   },

//   async createProfile(data: ProfileData): Promise<User> {
//     const res = await api.post('profile/', data);
//     return res.data as User;
//   },

//   async updateProfile(data: Partial<ProfileData>): Promise<User> {
//     const res = await api.put('profile/update/', data);
//     return res.data as User;
//   },

//   async getDashboardStats(): Promise<any> {
//     const { data } = await api.get('dashboard-stats/');
//     return data;
//   },
// };


// src/services/authService.ts
import api from '../utils/api';
import type { User, LoginCredentials, RegisterData, ProfileData } from '../types';
import { setAuthData, clearAuthData } from '../utils/auth';

// ✅ Small, safe helper to detect real files/blobs (works even if DOM lib types vary)
const isFileLike = (v: unknown): v is Blob => {
  if (!v) return false;
  if (typeof Blob !== 'undefined' && v instanceof Blob) return true;
  return typeof (v as any).size === 'number' && typeof (v as any).type === 'string';
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const { data } = await api.post('login/', credentials);

    const token: string = data.token;
    const user: User =
      data.user ??
      ({
        id: data.id,
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
        department: data.department,
        organization: data.organization,
        gender: data.gender,
        phone_number: data.phone_number,
        student_id: data.student_id,
        profile_picture: data.profile_picture,
        is_email_verified: data.is_email_verified ?? true,
        created_at: data.created_at ?? '',
        updated_at: data.updated_at ?? '',
        profile: data.profile,
      } as User);

    setAuthData(user, token);
    return { user, token };
  },

  async register(payload: RegisterData): Promise<User> {
    const form = new FormData();

    // 🔧 CHANGE #1: Append fields carefully; only send profile_picture when it’s a real File/Blob.
    //               Also, don’t add a manual Content-Type header (see CHANGE #2).
    Object.entries(payload).forEach(([k, v]) => {
      if (v === undefined || v === null) return;

      if (k === 'profile_picture') {
        if (isFileLike(v)) {
          form.append('profile_picture', v);
        }
        // if it’s a URL/string, skip it on register (backend expects a real file)
        return;
      }

      // If any arrays slip in, append each value with the same key (Django-friendly).
      if (Array.isArray(v)) {
        v.forEach((item) => form.append(k, String(item)));
        return;
      }

      form.append(k, String(v));
    });

    // 🔧 CHANGE #2: Let the browser/axios set multipart boundary. Manually setting
    //              'Content-Type': 'multipart/form-data' can cause DRF to see no boundary
    //              and return an HTML error page (the <!DOCTYPE ... you saw).
    const { data } = await api.post('register/', form);
    return data as User;
  },

  async logout(): Promise<void> {
    try {
      await api.post('logout/');
    } finally {
      clearAuthData();
    }
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get('profile/');
    return data as User;
  },

  async createProfile(data: ProfileData): Promise<User> {
    // JSON is fine here; backend endpoints expect JSON (no file upload on createProfile)
    const res = await api.post('profile/', data);
    return res.data as User;
  },

  async updateProfile(data: Partial<ProfileData>): Promise<User> {
    // Same: JSON payload, no manual multipart here (your update endpoint doesn’t accept picture)
    const res = await api.put('profile/update/', data);
    return res.data as User;
  },

  async getDashboardStats(): Promise<any> {
    const { data } = await api.get('dashboard-stats/');
    return data;
  },
};