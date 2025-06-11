import { Router } from "express";
import { provisionUser, deleteUser } from "../controllers/userController";
import { authenticateJWT } from "../middleware/authenticateJWT";

const router = Router();

// POST /api/users/provision
router.post("/provision", authenticateJWT as any, (req, res, next) => {
  Promise.resolve(provisionUser(req, res, next)).catch(next);
});

// DELETE /api/users/delete
router.delete("/delete", authenticateJWT as any, (req, res, next) => {
  Promise.resolve(deleteUser(req, res, next)).catch(next);
});

export default router;
