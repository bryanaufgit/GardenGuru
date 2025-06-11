// Wishlist-Controller für Wunschlisten-Feature
// Drei Funktionen: getWishlist, addToWishlist, removeFromWishlist

import { Request, Response } from "express";
import { PrismaClient, ReminderType } from "@prisma/client";
import { createNextReminder } from "../services/reminderService";

const prisma = new PrismaClient();

// Hilfsfunktion, um userId aus req.user zu lesen (wie bei Auth bereits genutzt)
function getUserId(req: any): string | null {
  // Passe das ggf. an, falls dein JWT-Decoding anders läuft
  console.log("Controller [wishlist/] req.user:", req.user);
  return req.user?.uid || null;
}

// GET /api/wishlist – Gibt alle Pflanzen auf der Wunschliste des Users zurück
export const getWishlist = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Nicht eingeloggt" });
  try {
    const wishlistEntries = await prisma.wishlist.findMany({
      where: { userId },
      include: { plant: true },
    });
    // Nur das Plant-Objekt je Eintrag zurückgeben
    const plants = wishlistEntries.map(entry => entry.plant);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Laden der Pflanzen" });
  }
};

// POST /api/wishlist – Fügt eine Pflanze zur Wunschliste hinzu
export const addToWishlist = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { plantId } = req.body;
  if (!userId) return res.status(401).json({ message: "Nicht eingeloggt" });
  if (!plantId) return res.status(400).json({ message: "plantId fehlt" });
  try {
    // Prüfen ob schon vorhanden
    const exists = await prisma.wishlist.findFirst({ where: { userId, plantId } });
    if (exists) return res.status(409).json({ message: "Pflanze schon hinzugefügt" });
    await prisma.wishlist.create({ data: { userId, plantId } });

    // 1. Hole die Pflanze (mit Intervallen)
    const plant = await prisma.plant.findUnique({ where: { id: plantId } });
    if (!plant) return res.status(404).json({ message: "Pflanze nicht gefunden" });

    // Reminder für alle Typen per Servicefunktion anlegen
    await createNextReminder({ userId, plant, type: ReminderType.WATERING, intervalDays: plant.wateringInterval });
    await createNextReminder({ userId, plant, type: ReminderType.FERTILIZING, intervalDays: plant.fertilizingInterval });
    await createNextReminder({ userId, plant, type: ReminderType.REPOTTING, intervalDays: plant.repottingInterval });

    res.status(201).json({ message: "Pflanze zu meinen Pflanzen hinzugefügt und Initial-Aufgaben angelegt" });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Hinzufügen zu meinen Pflanzen" });
  }
};

// DELETE /api/wishlist/:plantId – Entfernt eine Pflanze aus der Wunschliste
export const removeFromWishlist = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const plantId = Number(req.params.plantId);
  if (!userId) return res.status(401).json({ message: "Nicht eingeloggt" });
  if (!plantId) return res.status(400).json({ message: "plantId fehlt" });
  try {
    await prisma.wishlist.deleteMany({ where: { userId, plantId } });
    // Reminder zu dieser Pflanze für diesen User löschen
    await prisma.reminder.deleteMany({ where: { userId, plantId } });
    res.json({ message: "Pflanze aus meinen Pflanzen entfernt und Aufgaben gelöscht" });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Entfernen aus meinen Pflanzen" });
  }
};