import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllPlants = async (req: Request, res: Response) => {
  try {
    const plants = await prisma.plant.findMany();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Laden der Pflanzen." });
  }
};
