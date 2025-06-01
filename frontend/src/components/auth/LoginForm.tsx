// src/components/auth/LoginForm.tsx
import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const { setUser, setLoading, setError, loading, error } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await login(email, password);
      setUser(userCredential.user);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Login-Formular" className="space-y-4 max-w-sm mx-auto">
      <div>
        <label htmlFor="email" className="block font-medium">
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium">
          Passwort
        </label>
        <input
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
        aria-busy={loading}
      >
        {loading ? "Einloggen..." : "Einloggen"}
      </button>
    </form>
  );
}