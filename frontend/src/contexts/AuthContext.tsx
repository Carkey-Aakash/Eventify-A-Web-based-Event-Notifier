import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from '../types';
import { getStoredUser, getStoredToken, clearAuthData } from '../utils/auth';

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  /** Accepts a partial user and merges it into the current user */
  updateUser: (patch: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

type AuthProviderProps = { children: ReactNode };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearAuthData();
     window.location.replace('/');
  };

  /** Merge a partial user into the existing user */
  const updateUser = (patch: Partial<User>) => {
    setUser(prev => {
      if (!prev) {
        // No logged-in user; ignore partial to avoid creating an invalid object
        return prev;
      }
      const next = { ...prev, ...patch };
      localStorage.setItem('user', JSON.stringify(next));
      return next;
    });
  };

  const value: AuthContextType = { user, token, isLoading, login, logout, updateUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
