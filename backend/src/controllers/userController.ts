// src/controllers/userController.ts

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import admin from "../lib/firebaseAdmin";


// Prisma-Client Instanz (evtl. zentraler export im Projekt)
const prisma = new PrismaClient();

/**
 * POST /api/users/provision
 * Erwartet: req.user (durch Middleware gesetzt), body: { email?, name? }
 * Legt User in der DB an, falls noch nicht vorhanden.
 */
export async function provisionUser(req: Request, res: Response, next: NextFunction) {
  try {
    // User-Daten aus req.user holen
    const uid = req.user?.uid;
    if (!uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userEmail = req.user?.email;

    // E-Mail aus Body oder aus req.user.email
    const { email, name } = req.body;
    const finalEmail = email || userEmail;

    // User in der DB suchen/erstellen
    let user = await prisma.user.findUnique({
      where: { id: uid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: uid,
          email: finalEmail,
          name: name || null,
        },
      });
    }

    return res.status(200).json({
      message: "User provisioned",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Error in provisionUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
/**
 * DELETE /api/users/delete
 * Erwartet: req.user (durch Middleware gesetzt)
 * Löscht User aus der DB (inkl. aller nutzergebundenen Daten, falls gewünscht).
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    // User-Daten aus req.user holen
    const uid = req.user?.uid;
    if (!uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // User löschen (inkl. Fehlerfall)
    try {
      await prisma.user.delete({
        where: { id: uid },
      });
    } catch (err: any) {
      // Wenn nicht gefunden, trotzdem Erfolg (idempotent)
      if (err.code !== "P2025") {
        return res.status(500).json({ error: "Error deleting user" });
      }
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}