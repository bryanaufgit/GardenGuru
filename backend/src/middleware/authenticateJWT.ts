import { Request, Response, NextFunction } from "express";
import admin from "../lib/firebaseAdmin";

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("AUTH HEADER", req.headers.authorization);
    return res.status(401).json({ message: "No token provided" });
  }
  const idToken = authHeader.split(" ")[1];

  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      // @ts-ignore
      req.user = decodedToken;
      next();
    })
    .catch((err) => {
      return res.status(401).json({ message: "Invalid or expired token" });
    });
}