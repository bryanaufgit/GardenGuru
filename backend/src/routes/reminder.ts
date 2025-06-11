import { Router } from "express";
import { getReminders, createReminder, completeReminder, deleteReminder } from "../controllers/reminderController";
import { authenticateJWT } from "../middleware/authenticateJWT";
import { asyncHandler } from "../lib/asyncHandler";

const router = Router();

router.get("/", authenticateJWT as any, asyncHandler(getReminders));
router.post("/", authenticateJWT as any, asyncHandler(createReminder));
router.patch("/:id", authenticateJWT as any, asyncHandler(completeReminder));
router.delete("/:id", authenticateJWT as any, asyncHandler(deleteReminder));

export default router;