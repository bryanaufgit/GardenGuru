import { create } from 'zustand';
import { Plant } from '../types/plant';

interface PlantState {
  plants: Plant[];
  isLoading: boolean;
  error?: string;
  fetchPlants: () => Promise<void>;
}

export const usePlantStore = create<PlantState>((set) => ({
  plants: [],
  isLoading: false,
  error: undefined,
  fetchPlants: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const res = await fetch('https://gardenguru-2v3b.onrender.com/api/plants');
      if (!res.ok) throw new Error("Fehler beim Laden");
      const data = await res.json();
      set({ plants: data, isLoading: false, error: undefined });
    } catch (error) {
      console.error("Fehler beim Laden der Pflanzen:", error);
      set({ isLoading: false, error: "Fehler beim Laden der Pflanzen." });
    }
  }
}));