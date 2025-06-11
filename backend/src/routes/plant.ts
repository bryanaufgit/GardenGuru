import { Router } from "express";
import { getAllPlants } from "../controllers/plantController";

const router = Router();

router.get("/", getAllPlants);

export default router;
