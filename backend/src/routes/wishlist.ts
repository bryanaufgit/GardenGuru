//Route für Wishlist

// Wishlist-Routen definieren und exportieren
// Nutzt die drei Controller-Funktionen

import { Router } from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistController";
import { authenticateJWT } from "../middleware/authenticateJWT"; // ggf. anpassen je nach deinem Projekt
import { asyncHandler } from "../lib/asyncHandler";


const router = Router();

// Alle Routen authpflichtig
router.use(authenticateJWT as any);



router.get("/", asyncHandler(getWishlist));
router.post("/", asyncHandler(addToWishlist));
router.delete("/:plantId", asyncHandler(removeFromWishlist));

export default router;