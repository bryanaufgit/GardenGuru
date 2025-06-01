import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { register, provisionUserApi } from "../../api/authApi";

export function RegisterForm() {
  const navigate = useNavigate();
  const { setUser, setLoading, setError, loading, error } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await register(email, password);
      if (!userCredential.user.email) {
        throw new Error("E-Mail-Adresse konnte nicht abgerufen werden.");
      }
      await provisionUserApi(userCredential.user.email);
      setUser(userCredential.user);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Registrierungsformular" className="space-y-4 max-w-sm mx-auto">
      <div>
        <label htmlFor="reg-email" className="block font-medium">E-Mail</label>
        <input
          id="reg-email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label htmlFor="reg-password" className="block font-medium">Passwort</label>
        <input
          id="reg-password"
          type="password"
          value={password}
          autoComplete="new-password"
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
        {loading ? "Registrieren..." : "Registrieren"}
      </button>
    </form>
  );
}