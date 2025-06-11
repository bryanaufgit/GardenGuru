import { create } from "zustand";
import { Plant } from "../types/plant";
import { getWishlist, addToWishlist, removeFromWishlist } from "../api/wishlistApi";

interface WishlistState {
  wishlist: Plant[];
  loading: boolean;
  error: string | null;
  loadWishlist: () => Promise<void>;
  addPlant: (plantId: number) => Promise<void>;
  removePlant: (plantId: number) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  loading: false,
  error: null,

  loadWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const plants = await getWishlist();
      set({ wishlist: plants, loading: false });
    } catch (err) {
      set({ error: "Fehler beim Laden der Pflanzen.", loading: false });
    }
  },

  addPlant: async (plantId: number) => {
    set({ loading: true, error: null });
    try {
      await addToWishlist(plantId);
      // Nach dem Hinzufügen neu laden
      await get().loadWishlist();
    } catch (err) {
      set({ error: "Fehler beim Hinzufügen.", loading: false });
    }
  },

  removePlant: async (plantId: number) => {
    set({ loading: true, error: null });
    try {
      await removeFromWishlist(plantId);
      // Nach dem Entfernen neu laden
      await get().loadWishlist();
    } catch (err) {
      set({ error: "Fehler beim Entfernen.", loading: false });
    }
  }
}));