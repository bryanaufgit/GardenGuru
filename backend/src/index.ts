import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/user';
import plantRoutes from "./routes/plant";
import wishlistRoutes from "./routes/wishlist";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import reminderRoutes from "./routes/reminder";



dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/images', express.static('public/images'));
app.use("/api/plants", plantRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reminders", reminderRoutes);


// Testroute

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Serverfehler", error: err?.message || err });
});