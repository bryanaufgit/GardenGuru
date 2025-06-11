// src/store/userStore.ts
import create from "zustand";

interface UserState {
  user: any | null;
  token: string | null;          // <--- NEU!
  loading: boolean;
  error: string | null;
  setUser: (user: any | null, token?: string | null) => void; // <--- angepasst
  setToken: (token: string | null) => void;                   // <--- NEU!
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,                        // <--- NEU!
  loading: true,
  error: null,
  setUser: (user, token = null) => set({ user, token }), // <--- angepasst
  setToken: (token) => set({ token }),                   // <--- NEU!
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, token: null, loading: false, error: null }), // <--- token zurücksetzen
}));