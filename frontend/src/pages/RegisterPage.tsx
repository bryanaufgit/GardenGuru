// src/pages/RegisterPage.tsx
import { RegisterForm } from "../components/auth/RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Registrieren</h1>
        <RegisterForm />
        <div className="mt-6 text-center">
          <span className="text-gray-700">Schon ein Konto? </span>
          <Link to="/login" className="link link-primary">Zum Login</Link>
        </div>
      </div>
    </div>
  );
}