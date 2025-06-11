import { LoginForm } from "../components/auth/LoginForm";
import { ForgotPasswordForm } from "../components/auth/ForgotPasswordForm";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [showReset, setShowReset] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
        <div className="mt-2 text-center">
          <button
            type="button"
            className="link link-primary"
            onClick={() => setShowReset(!showReset)}
          >
            Passwort vergessen?
          </button>
        </div>
        {showReset && (
          <div className="mt-6">
            <ForgotPasswordForm />
          </div>
        )}
        <div className="mt-6 text-center">
          <span className="text-gray-700">Noch kein Konto? </span>
          <Link to="/register" className="link link-primary">Jetzt registrieren</Link>
        </div>
      </div>
    </div>
  );
}