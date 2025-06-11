// reminderService.ts
import { PrismaClient, ReminderType, Plant } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Reminder für einen bestimmten Typ, Pflanze und User anlegen (mit Duplikat-Prüfung)
 * @param params userId: string, plant: Plant, type: ReminderType, intervalDays: number
 * @returns den neu angelegten Reminder oder null (wenn Reminder schon existiert)
 */
export async function createNextReminder({
  userId,
  plant,
  type,
  intervalDays,
  previousDueDate
}: {
  userId: string,
  plant: Plant,
  type: ReminderType,
  intervalDays: number,
  previousDueDate?: Date // optionales Fälligkeitsdatum
}) {
  // Gibt es schon einen offenen Reminder?
  const alreadyOpen = await prisma.reminder.findFirst({
    where: {
      userId,
      plantId: plant.id,
      type,
      completed: false
    }
  });
  if (alreadyOpen) {
    return null;
  }
  // Fälligkeitsdatum: immer von previousDueDate, sonst heute
  const baseDate = previousDueDate ? new Date(previousDueDate) : new Date();
  baseDate.setHours(0,0,0,0);
  const nextDate = new Date(baseDate);
  nextDate.setDate(baseDate.getDate() + intervalDays);
  return await prisma.reminder.create({
    data: {
      userId,
      plantId: plant.id,
      date: nextDate,
      type,
      completed: false
    }
  });
}