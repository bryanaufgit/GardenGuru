import { create } from 'zustand';

interface Plant {
  id: number;
  name: string;
  latinName: string;
  light: string;
  water: string;
  image: string;
}

interface PlantState {
  plants: Plant[];
  isLoading: boolean;
  fetchPlants: () => Promise<void>;
}

export const usePlantStore = create<PlantState>((set) => ({
  plants: [],
  isLoading: false,
  fetchPlants: async () => {
    try {
      const res = await fetch('http://localhost:4000/plants');
      if (!res.ok) throw new Error("Fehler beim Laden");
      const data = await res.json();
      set({ plants: data });
    } catch (error) {
      console.error("Fehler beim Laden der Pflanzen:", error);
    }
  }
}));