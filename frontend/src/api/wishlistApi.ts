
// Wishlist/Favoriten API-Layer für das Frontend
// Drei Funktionen: getWishlist, addToWishlist, removeFromWishlist
// JWT aus userStore holen (ggf. anpassen, wie bei authApi)

import { Plant } from '../types/plant';
import { useUserStore } from '../store/userStore';

const API_BASE_URL = 'http://localhost:4000/api/wishlist';

export async function getWishlist(): Promise<Plant[]> {
  const token = useUserStore.getState().token;
  console.log("JWT Token für Wishlist:", token);
  const res = await fetch(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Fehler beim Laden der Pflanzen');
  return res.json();
}

export async function addToWishlist(plantId: number): Promise<void> {
  const token = useUserStore.getState().token;
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ plantId })
  });
  if (!res.ok) throw new Error('Fehler beim Hinzufügen zu meinen Pflanzen');
}

export async function removeFromWishlist(plantId: number): Promise<void> {
  const token = useUserStore.getState().token;
  const res = await fetch(`${API_BASE_URL}/${plantId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Fehler beim Entfernen');
}