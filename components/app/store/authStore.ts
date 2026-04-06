import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole, AuthResponse } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      login: (data: AuthResponse) => {
        set({
          user: data.user,
          token: data.token,
          role: data.user.role,
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          role: null,
        });
      },
      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.user;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
