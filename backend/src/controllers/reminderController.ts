import { Request, Response } from "express";
import { PrismaClient, ReminderType } from "@prisma/client";
import { createNextReminder } from "../services/reminderService";

const prisma = new PrismaClient();

function getUserId(req: any): string | null {
  console.log("Controller [/reminder] req.user:", req.user);
  return req.user?.uid || null;
}

// GET /api/reminders – Alle Aufgaben des eingeloggten Users
export const getReminders = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Nicht eingeloggt" });
  try {
    const reminders = await prisma.reminder.findMany({
      where: { userId },
      include: { plant: true }
    });
    res.json(reminders);
  } catch (err) {
  console.error("Fehler in getReminders:", err); // oder analog für andere Methoden
  res.status(500).json({ message: "Fehler beim Laden der Erinnerungen" });
}
};

// POST /api/reminders – Neuen Reminder anlegen
export const createReminder = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { plantId, date, type } = req.body;
  if (!userId) return res.status(401).json({ message: "Nicht eingeloggt" });
  if (!plantId || !date || !type) {
    return res.status(400).json({ message: "plantId, date und type sind erforderlich" });
  }
  try {
    const newReminder = await prisma.reminder.create({
      data: {
        userId,
        plantId,
        date: new Date(date),
        type,
        completed: false
      }
    });
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Anlegen der Erinnerung" });
  }
};

// PATCH /api/reminders/:id – Reminder als erledigt markieren
export const completeReminder = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { id } = req.params;
  if (!userId) return res.status(401).json({ message: "Nicht eingeloggt" });
  if (!id) return res.status(400).json({ message: "id fehlt" });
  try {
    // 1. Reminder als erledigt markieren
    const updated = await prisma.reminder.updateMany({
      where: { id: Number(id), userId },
      data: { completed: true }
    });

    // 2. Hole den Reminder inkl. Plant
    const oldReminder = await prisma.reminder.findUnique({
      where: { id: Number(id) },
      include: { plant: true }
    });
    if (!oldReminder || !oldReminder.plant) {
      return res.json({ message: "Reminder erledigt, aber keine Pflanze gefunden.", updatedCount: updated.count });
    }

    // 3. Ermittle das Intervall und Reminder-Typ (für Service)
    let intervalDays = 0;
    switch (oldReminder.type) {
      case "WATERING":
        intervalDays = oldReminder.plant.wateringInterval;
        break;
      case "FERTILIZING":
        intervalDays = oldReminder.plant.fertilizingInterval;
        break;
      case "REPOTTING":
        intervalDays = oldReminder.plant.repottingInterval;
        break;
      default:
        break;
    }
    if (intervalDays > 0) {
      await createNextReminder({
        userId,
        plant: oldReminder.plant,
        type: oldReminder.type,
        intervalDays,
        previousDueDate: oldReminder.date // NEU: Übergib das alte Fälligkeitsdatum!
      });
    }

    res.json({ message: "Erinnerung als erledigt markiert & neue Folge-Aufgabe erstellt", updatedCount: updated.count });
  } catch (err) {
    console.error("Fehler in completeReminder:", err);
    res.status(500).json({ message: "Fehler beim Aktualisieren der Erinnerung" });
  }
};

// DELETE /api/reminders/:id – Reminder löschen (optional)
export const deleteReminder = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { id } = req.params;
  if (!userId) return res.status(401).json({ message: "Nicht eingeloggt" });
  if (!id) return res.status(400).json({ message: "id fehlt" });
  try {
    await prisma.reminder.deleteMany({ where: { id: Number(id), userId } });
    res.json({ message: "Erinnerung gelöscht" });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Löschen der Erinnerung" });
  }
};