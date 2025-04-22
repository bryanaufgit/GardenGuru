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
  fetchPlants: () => Promise<void>;
}

export const usePlantStore = create<PlantState>((set) => ({
  plants: [],
  fetchPlants: async () => {
    const res = await fetch('http://localhost:4000/plants');
    const data = await res.json();
    set({ plants: data });
  },
}));