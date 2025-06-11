import { create } from "zustand";
import { Reminder, getReminders, createReminder, completeReminder, deleteReminder } from "../api/reminderApi";

interface ReminderState {
  reminders: Reminder[];
  loading: boolean;
  error: string | null;
  loadReminders: () => Promise<void>;
  addReminder: (data: { plantId: number; date: string; type: Reminder["type"] }) => Promise<void>;
  complete: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const useReminderStore = create<ReminderState>((set, get) => ({
  reminders: [],
  loading: false,
  error: null,
  loadReminders: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getReminders();
      set({ reminders: data, loading: false });
    } catch (err: any) {
      console.error("ReminderStore error", err);
      const errorMsg = err?.response?.data?.message || err?.message || "Fehler beim Laden der Aufgaben.";
      set({ error: errorMsg, loading: false });
    }
  },
  addReminder: async (data) => {
    set({ loading: true, error: null });
    try {
      await createReminder(data);
      await get().loadReminders();
    } catch (err: any) {
      console.error("ReminderStore error", err);
      const errorMsg = err?.response?.data?.message || err?.message || "Fehler beim Laden der Aufgaben.";
      set({ error: errorMsg, loading: false });
    }
  },
  complete: async (id) => {
    set({ loading: true, error: null });
    try {
      await completeReminder(id);
      await get().loadReminders();
    } catch (err: any) {
      console.error("ReminderStore error", err);
      const errorMsg = err?.response?.data?.message || err?.message || "Fehler beim Laden der Aufgaben.";
      set({ error: errorMsg, loading: false });
    }
  },
  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteReminder(id);
      await get().loadReminders();
    } catch (err: any) {
      console.error("ReminderStore error", err);
      const errorMsg = err?.response?.data?.message || err?.message || "Fehler beim Laden der Aufgaben.";
      set({ error: errorMsg, loading: false });
    }
  }
}));