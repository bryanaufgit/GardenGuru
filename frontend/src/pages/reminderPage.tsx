// ReminderPage: Zeigt alle Aufgaben an
// - Holt Aufgaben aus useReminderStore
// - Lädt Aufgaben beim Mount
// - Zeigt Pflanze, Typ, Datum, Status, Erledigen-Button
// - Link zur Pflanzendetailseite
// - Responsive und ansprechendes Layout
// - Erledigte Aufgaben per Toggle anzeigen/ausblenden
// - Ladeanimation: Spinner statt Text
// - Toast: Erfolgsmeldung nach "Als erledigt markieren"

import { useEffect, useState } from "react";
import { useReminderStore } from "../store/reminderStore";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";

// Hilfsfunktionen für Card-Styling und Text
function getCardStyleAndIcon(type: string) {
  switch (type) {
    case "WATERING":
      return { color: "bg-blue-100 border-blue-400", icon: "💧" };
    case "FERTILIZING":
      return { color: "bg-yellow-100 border-yellow-400", icon: "🧪" };
    case "REPOTTING":
      return { color: "bg-red-100 border-red-400", icon: "🪴" };
    default:
      return { color: "bg-gray-100 border-gray-300", icon: "" };
  }
}

function getTaskText(reminder: any) {
  const due = new Date(reminder.date);
  const today = new Date();
  today.setHours(0,0,0,0);
  due.setHours(0,0,0,0);
  const diff = Math.round((due.getTime() - today.getTime()) / (1000*60*60*24));
  let what = "";
  if (reminder.type === "WATERING") what = "Gießen";
  if (reminder.type === "FERTILIZING") what = "Düngen";
  if (reminder.type === "REPOTTING") what = "Umtopfen";
  if (diff < 0) return `${what} war fällig`;
  if (diff === 0) return `${what} fällig heute`;
  if (diff === 1) return `${what} fällig morgen`;
  return `${what} fällig in ${diff} Tagen`;
}

function isMarkCompleteAllowed(reminder: any) {
  const dueDate = new Date(reminder.date);
  const today = new Date();
  today.setHours(0,0,0,0);
  dueDate.setHours(0,0,0,0);
  const diff = (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 1;
}

function getDueLabel(reminderDateStr: string, completed: boolean) {
  if (completed) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(reminderDateStr);
  dueDate.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">Überfällig</span>;
  }
  if (diffDays === 0) {
    return <span className="bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded text-xs font-semibold">Heute fällig</span>;
  }
  if (diffDays === 1) {
    return <span className="bg-primary-light text-primary-dark px-2 py-0.5 rounded text-xs">Morgen</span>;
  }
  return null;
}

export default function ReminderPage() {
  const { loading: authLoading, token } = useUserStore();
  const { reminders, loading, error, loadReminders, complete } = useReminderStore();
  const [showCompleted, setShowCompleted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && token && reminders.length === 0) {
      loadReminders();
    }
  }, [authLoading, token, reminders.length, loadReminders]);

  const handleComplete = async (id: number) => {
    try {
      await complete(id);
      setToast("Aufgabe erledigt!");
      setTimeout(() => setToast(null), 2000);
    } catch (e) {
      setToast("Aktion fehlgeschlagen");
      setTimeout(() => setToast(null), 2000);
    }
  };

  // Gefilterte Reminder je nach showCompleted
  const filteredReminders = reminders.filter(r => showCompleted || !r.completed);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meine Aufgaben</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          id="toggle-completed"
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(v => !v)}
          className="mr-2 accent-primary"
        />
        <label htmlFor="toggle-completed" className="text-sm cursor-pointer">
          Erledigte Aufgaben anzeigen
        </label>
      </div>
      {toast && (
        <div className="mb-4 px-4 py-2 rounded bg-green-500 text-white text-sm shadow animate-fade-in">
          {toast}
        </div>
      )}
      {(authLoading || loading) && (
        <div className="flex items-center gap-2 mb-4">
          <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Lade Aufgaben ...</span>
        </div>
      )}
      {!authLoading && error && <p className="text-red-500">{error}</p>}
      {filteredReminders.length === 0 && !loading && <p>Du hast aktuell keine Aufgaben.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredReminders.map((reminder) => {
          const { color, icon } = getCardStyleAndIcon(reminder.type);
          return (
            <div
              key={reminder.id}
              className={`rounded-3xl shadow flex items-center gap-4 p-4 min-h-[130px] w-full max-w-xl mx-auto border-2 ${color} ${reminder.completed ? "opacity-60" : ""}`}
            >
              <span className="text-2xl mb-2">{icon}</span>
              <Link to={`/plants/${reminder.plantId}`} className="flex flex-col items-center">
                <img
                  src={reminder.plant.image && reminder.plant.image.trim() !== '' ? reminder.plant.image : '/placeholder-plant.jpg'}
                  alt={`Foto von ${reminder.plant.name}`}
                  className="w-16 h-16 rounded-2xl object-cover border bg-white shadow"
                />
              </Link>
              <div className="flex-1 flex flex-col items-start justify-center min-w-0">
                <Link to={`/plants/${reminder.plantId}`}
                  className="font-semibold text-base sm:text-lg text-primary-dark hover:underline truncate block max-w-[160px] mx-auto"
                  title={reminder.plant.name}
                >
                  {reminder.plant.name}
                </Link>
                <span className="text-xs text-gray-600 mb-2 truncate max-w-[180px]">{reminder.plant.latinName || ""}</span>
                <span className="text-sm font-semibold mt-1">{getTaskText(reminder)}</span>
                {getDueLabel(reminder.date, reminder.completed)}
              </div>
              {!reminder.completed && (
                <button
                  onClick={() => handleComplete(reminder.id)}
                  className="ml-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-dark transition"
                  disabled={!isMarkCompleteAllowed(reminder)}
                  title={!isMarkCompleteAllowed(reminder) ? "Du kannst Aufgaben erst am Fälligkeitstag oder einen Tag vorher abhaken." : ""}
                  style={isMarkCompleteAllowed(reminder) ? {} : { opacity: 0.5, cursor: 'not-allowed' }}
                >
                  Abhaken
                </button>
              )}
              {reminder.completed && <span className="text-green-600 font-semibold block ml-2">Erledigt</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}