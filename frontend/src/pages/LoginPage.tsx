

import { LoginForm } from "../components/auth/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
        <div className="mt-6 text-center">
          <span className="text-gray-700">Noch kein Konto? </span>
          <Link to="/register" className="link link-primary">Jetzt registrieren</Link>
        </div>
      </div>
    </div>
  );
}