// src/store/userStore.ts
import create from "zustand";

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
  setUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, loading: false, error: null }),
}));