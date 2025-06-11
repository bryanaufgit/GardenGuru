import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllPlants = async (req: Request, res: Response) => {
  try {
    console.log("GET /api/plants aufgerufen");
    const plants = await prisma.plant.findMany();
    res.json(plants);
  } catch (error: any) {
    console.error("Fehler beim Laden der Pflanzen:", error);
    res.status(500).json({ message: "Fehler beim Laden der Pflanzen.", error: error?.message || error });
  }
};
