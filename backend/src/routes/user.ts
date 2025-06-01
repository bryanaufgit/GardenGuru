import { Router } from "express";
import { provisionUser } from "../controllers/userController";

const router = Router();

// POST /api/users/provision
router.post("/provision", (req, res, next) => {
  Promise.resolve(provisionUser(req, res, next)).catch(next);
});

export default router;
