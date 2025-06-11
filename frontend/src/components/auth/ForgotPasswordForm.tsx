import { useState } from "react";
import { sendPasswordReset } from "../../api/authApi";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await sendPasswordReset(email);
      setSuccess("Prüfe dein Postfach! Eine E-Mail zum Zurücksetzen wurde gesendet.");
    } catch (err: any) {
      setError("Konnte keine Reset-Mail senden. Existiert die Adresse?");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-6">
      <div>
        <label htmlFor="reset-email" className="block font-medium">E-Mail</label>
        <input
          id="reset-email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      {success && <div className="text-green-600">{success}</div>}
      {error && <div className="text-red-600">{error}</div>}
      <button type="submit" className="btn btn-primary w-full">
        Passwort zurücksetzen
      </button>
    </form>
  );
}