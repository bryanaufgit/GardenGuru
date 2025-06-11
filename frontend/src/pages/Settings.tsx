import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { auth } from "../lib/firebase";

export default function SettingsPage() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  // Für Account löschen Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteAccount() {
    setError(null);
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error("Kein Auth-Token verfügbar.");
      }

      const response = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Fehler beim Löschen des Accounts.");
      }

      await auth.currentUser?.delete();

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Unbekannter Fehler.");
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-2xl p-8 flex flex-col gap-8">
        <h2 className="text-2xl font-bold mb-2 text-primary text-center">Einstellungen</h2>
        <div className="flex flex-col gap-6">

          {/* Theme (bald verfügbar) */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">App-Design (Hell/Dunkel)</span>
            <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full ml-3">bald verfügbar</span>
          </div>

          {/* Sprache (bald verfügbar) */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Sprache</span>
            <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full ml-3">bald verfügbar</span>
          </div>

          {/* Feedback */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Feedback</span>
            <a
              href="mailto:info@gardenguru.de?subject=Feedback zu GardenGuru"
              className="text-primary underline font-medium"
              target="_blank" rel="noopener noreferrer"
            >
              E-Mail senden
            </a>
          </div>

          {/* Newsletter/Opt-In (bald verfügbar) */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Newsletter/Benachrichtigungen</span>
            <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full ml-3">bald verfügbar</span>
          </div>

          {/* Daten zurücksetzen (bald verfügbar) */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Alle Daten zurücksetzen</span>
            <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full ml-3">bald verfügbar</span>
          </div>

          {/* Account löschen */}
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
            >
              Account löschen
            </button>
          </div>

          {/* App-Version und Impressum */}
          <div className="text-xs text-gray-400 mt-4 flex flex-col items-center">
            GardenGuru Version 1.0 – Stand Juni 2025
            <a href="/impressum" className="underline text-primary mt-1">Impressum & Datenschutz</a>
          </div>
        </div>
      </div>

      {/* Modal für Account löschen */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-red-600">
              Account wirklich löschen?
            </h3>
            <p className="text-gray-700">
              Diese Aktion kann nicht rückgängig gemacht werden. Alle deine Daten
              werden dauerhaft gelöscht.
            </p>
            {error && (
              <div className="text-red-600 font-semibold bg-red-100 p-2 rounded">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="py-2 px-6 rounded bg-red-600 hover:bg-red-700 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Löschen..." : "Löschen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}