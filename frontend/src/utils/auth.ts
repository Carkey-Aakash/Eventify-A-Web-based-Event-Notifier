import type { User } from '../types'; // 👈 type-only import (no runtime import)

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const getStoredUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? (JSON.parse(userStr) as User) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthData = (user: User, token: string) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthData = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!(getStoredToken() && getStoredUser());
};

export const hasRole = (user: User | null, roles: ReadonlyArray<User['role']>): boolean => {
  return !!user && roles.includes(user.role);
};