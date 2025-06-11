// src/api/authApi.ts
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

const API_BASE_URL = "https://gardenguru-2v3b.onrender.com";

export function sendPasswordReset(email: string) {
  return sendPasswordResetEmail(auth, email);
}
export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export async function provisionUserApi(email: string, name?: string) {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("User not logged in");

  const response = await fetch(`${API_BASE_URL}/api/users/provision`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ email, name }),
  });

  if (!response.ok) {
    throw new Error(`Provisioning failed: ${await response.text()}`);
  }

  return response.json();
}