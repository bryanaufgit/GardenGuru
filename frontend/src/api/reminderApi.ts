import { Plant } from '../types/plant';
import { useUserStore } from '../store/userStore';

export type Reminder = {
  id: number;
  userId: string;
  plantId: number;
  plant: Plant;
  date: string;
  type: 'WATERING' | 'FERTILIZING' | 'REPOTTING';
  completed: boolean;
};

const API_BASE_URL = 'https://gardenguru-2v3b.onrender.com/api/reminders';

export async function getReminders(): Promise<Reminder[]> {
  const token = useUserStore.getState().token;
  console.log("JWT-Token für Reminders reminderApi.ts:", token);
  const res = await fetch(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Fehler beim Laden der Aufgaben');
  return res.json();
}

export async function createReminder(data: {
  plantId: number;
  date: string;
  type: Reminder['type'];
}): Promise<Reminder> {
  const token = useUserStore.getState().token;
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Fehler beim Erstellen der Aufgabe');
  return res.json();
}

export async function completeReminder(id: number): Promise<void> {
  const token = useUserStore.getState().token;
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Fehler beim Erledigen der Aufgabe');
}

export async function deleteReminder(id: number): Promise<void> {
  const token = useUserStore.getState().token;
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Fehler beim Löschen der Aufgabe');
}