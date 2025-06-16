// Hilfsfunktion, um zu prüfen, ob das Abhaken erlaubt ist (max. 1 Tag vor Fälligkeit)
function isMarkCompleteAllowed(reminder: any) {
  const dueDate = new Date(reminder.date);
  const today = new Date();
  today.setHours(0,0,0,0);
  dueDate.setHours(0,0,0,0);
  const diff = (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 1;
}

import { useUserStore } from "../store/userStore";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReminderStore } from "../store/reminderStore";
import { usePlantStore } from "../store/plantStore";
import { useWishlistStore } from "../store/wishlistStore";
import PageWrapper from "../components/PageWrapper";
import SectionTitle from '../components/SectionTitle';

export default function HomePage() {
  const { reminders, loading, loadReminders, complete } = useReminderStore();
  const { plants, fetchPlants } = usePlantStore();
  const { wishlist } = useWishlistStore();
  const navigate = useNavigate();
  const { loading: authLoading, token } = useUserStore();
  const didLoadRef = useRef(false);

  useEffect(() => {
    if (!authLoading && token && !didLoadRef.current) {
      fetchPlants();
      loadReminders();
      didLoadRef.current = true;
    }
  }, [authLoading, token, fetchPlants, loadReminders]);

  // Quick-Stats
  const openReminders = reminders.filter(r => !r.completed);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayReminders = openReminders.filter(r => {
    const due = new Date(r.date);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
  });
  const completedCount = reminders.filter(r => r.completed).length;

  // Die nächsten 4 Aufgaben (überfällig, heute, dann demnächst)
  const sortedReminders = [...openReminders].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const nextReminders = sortedReminders.slice(0, 4);

  function getDueLabel(reminderDateStr: string) {
    const dueDate = new Date(reminderDateStr);
    dueDate.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (diff < 0) return <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold ml-2">Überfällig</span>;
    if (diff === 0) return <span className="bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded text-xs font-semibold ml-2">Heute</span>;
    if (diff === 1) return <span className="bg-primary-light text-primary-dark px-2 py-0.5 rounded text-xs ml-2">Morgen</span>;
    return null;
  }

  return (
    <PageWrapper>
      <div
        className="absolute top-4 right-2 sm:top-6 sm:right-6 z-30 flex items-center gap-3"
      >
        <button
          aria-label="FAQ anzeigen"
          onClick={() => navigate('/faq')}
          className="text-primary hover:text-primary-dark text-xl sm:text-2xl font-bold transition focus:outline-none focus:underline"
          title="Häufige Fragen zur Pflanzenpflege"
        >
          ?
        </button>
        <a
          href="/impressum"
          className="text-gray-400 hover:text-primary text-base underline underline-offset-2 transition"
          style={{ fontWeight: 500 }}
          tabIndex={0}
        >
          Impressum
        </a>
      </div>
      <div className="text-center mb-8 flex justify-center items-center gap-3">
        <img
          src="/logos/Logo_Bild_transparent.png"
          alt="GardenGuru Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          draggable={false}
        />
        <h1 className="text-3xl font-bold text-primary">GardenGuru</h1>
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8">
        {/* Aufgaben-Boxen (2/3 Spalten) */}
        <div className="lg:col-span-2 space-y-4">
          <SectionTitle>Anstehende Aufgaben</SectionTitle>
          {(authLoading || loading) && <div>Lade Aufgaben...</div>}
          {nextReminders.length === 0 && !loading && (
            <div className="bg-white p-6 rounded-xl shadow text-gray-600 text-center">Keine offenen Aufgaben!</div>
          )}
          {/* Aufgaben-Cards farbig und visuell modern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nextReminders.map(reminder => {
              const { color, icon } = getCardStyleAndIcon(reminder.type);
              return (
                <div
                  key={reminder.id}
                  className={`rounded-3xl shadow flex items-center gap-4 p-4 min-h-[130px] w-full max-w-xl mx-auto border-2 ${color}`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">{icon}</span>
                    <img
                      src={reminder.plant?.image && reminder.plant.image.trim() !== "" ? reminder.plant.image : "/placeholder-plant.jpg"}
                      alt={reminder.plant?.name || "Pflanze"}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-center min-w-0">
                    <span className="text-lg font-bold truncate max-w-[130px]">{reminder.plant?.name || "?"}</span>
                    <span className="text-xs text-gray-600 mb-2 truncate max-w-[180px]">{reminder.plant?.latinName || ""}</span>
                    <span className="text-sm font-semibold mt-1">
                      {getTaskText(reminder)}
                    </span>
                  </div>
                  <button
                    onClick={() => complete(reminder.id)}
                    className="ml-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-dark transition"
                    disabled={!isMarkCompleteAllowed(reminder)}
                    title={
                      !isMarkCompleteAllowed(reminder)
                        ? "Du kannst Aufgaben erst am Fälligkeitstag oder einen Tag vorher abhaken."
                        : ""
                    }
                    style={
                      isMarkCompleteAllowed(reminder)
                        ? {}
                        : { opacity: 0.5, cursor: 'not-allowed' }
                    }
                  >
                    Abhaken
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rechte Spalte: Gamification-Design */}
        <div className="bg-gradient-to-br from-primary-dark to-green-50 rounded-3xl shadow-lg p-7 text-center flex flex-col items-center border border-primary/10">
          {/* Level-Icon & Progress */}
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full border-8 border-primary/30 bg-white flex items-center justify-center mx-auto shadow">
              <span className="text-3xl font-bold text-primary">{Math.floor((completedCount * 40) / 100) + 1}</span>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20">
              {/* Fortschrittsbalken */}
              <div className="h-2 rounded-full bg-primary/20">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min((completedCount * 40) % 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mb-2 font-semibold text-primary-dark text-lg">Level</div>
          <div className="text-sm text-gray-800 mb-2">
            <div>🌱 <strong>{wishlist.length}</strong> Pflanzen</div>
            <div>✅ <strong>{completedCount}</strong> Aufgaben erledigt</div>
            {/* <div>⭐️ <strong>{(completedCount * 10) % 100}</strong> XP bis Level {Math.floor((completedCount * 10) / 100) + 2}</div> */}
            <div>📅 <strong>{todayReminders.length}</strong> fällig heute</div>
          </div>
          <div className="flex gap-2 mt-3">
            {/* Achievement-Badges als Platzhalter */}
            <div className="w-9 h-9 rounded-full bg-green-300 flex items-center justify-center text-lg shadow-inner ring-2 ring-white">🏅</div>
            <div className="w-9 h-9 rounded-full bg-yellow-300 flex items-center justify-center text-lg shadow-inner ring-2 ring-white">🏆</div>
            <div className="w-9 h-9 rounded-full bg-blue-300 flex items-center justify-center text-lg shadow-inner ring-2 ring-white">🌟</div>
          </div>
          <p className="text-xs text-black mt-2">
            XP und Achievements werden beim Pflegen deiner Pflanzen gesammelt.<br />
            Weitere Level-Features folgen!
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

// Hilfsfunktion für Card-Farbe & Icon (vor return einfügen):
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

// Fälligkeits-Text für die Card (vor return):
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