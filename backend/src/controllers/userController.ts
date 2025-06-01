// src/controllers/userController.ts

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import admin from "../lib/firebaseAdmin";

// Prisma-Client Instanz (evtl. zentraler export im Projekt)
const prisma = new PrismaClient();

/**
 * POST /api/users/provision
 * Erwartet: Authorization Header (Firebase ID Token), body: { email, name? }
 * Legt User in der DB an, falls noch nicht vorhanden.
 */
export async function provisionUser(req: Request, res: Response, next: NextFunction) {
  try {
    // Firebase Token aus Header extrahieren
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const idToken = authHeader.split(" ")[1];

    // Firebase Token prüfen & UID auslesen
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    const uid = decodedToken.uid;

    // E-Mail aus Body (oder aus Token)
    const { email, name } = req.body;
    const userEmail = email || decodedToken.email;

    // User in der DB suchen/erstellen
    let user = await prisma.user.findUnique({
      where: { id: uid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: uid,
          email: userEmail,
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