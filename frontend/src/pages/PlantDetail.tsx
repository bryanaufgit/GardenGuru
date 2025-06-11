// Hilfsfunktion: Aufgaben dürfen nur am Fälligkeitstag oder einen Tag vorher abgehakt werden
function isMarkCompleteAllowed(reminder: any) {
  const dueDate = new Date(reminder.date);
  const today = new Date();
  today.setHours(0,0,0,0);
  dueDate.setHours(0,0,0,0);
  const diff = (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 1; // heute, überfällig oder maximal 1 Tag in der Zukunft
}
import { useParams, useNavigate } from "react-router-dom";
import { usePlantStore } from "../store/plantStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useReminderStore } from "../store/reminderStore";
import PlantCard from "../components/PlantCard";

export default function PlantDetail() {
  const { plantId } = useParams<{ plantId: string }>();
  const { plants } = usePlantStore();
  const { wishlist, addPlant, removePlant } = useWishlistStore();
  const navigate = useNavigate();
  const { reminders, complete } = useReminderStore();

  const plant = plants.find((p) => p.id === Number(plantId));
  const inWishlist = wishlist.some((p) => p.id === Number(plantId));

  // Zeige alle offenen Aufgaben für diese Pflanze
  const plantReminders = reminders.filter(
    (r) => r.plantId === (plant?.id ?? -1) && !r.completed
  );

  // Helper für Reminder-Card (Farben & Icons)
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

  if (!plant) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <button
          className="mb-4 text-primary-dark hover:underline"
          onClick={() => navigate(-1)}
        >
          ← Zurück
        </button>
        <p className="text-lg">Pflanze nicht gefunden.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-3xl shadow-xl mt-6">
      <button
        className="mb-4 text-primary-dark hover:underline"
        onClick={() => navigate(-1)}
      >
        ←
      </button>
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-shrink-0 bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-4 shadow w-full sm:w-60 h-60 flex items-center justify-center">
          <img
            src={plant.image && plant.image.trim() !== "" ? plant.image : "/placeholder-plant.jpg"}
            alt={`Foto der Pflanze ${plant.name}`}
            className="w-48 h-48 object-cover rounded-2xl border-4 border-white shadow"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <h2 className="text-3xl font-bold text-primary-dark truncate" title={plant.name}>{plant.name}</h2>
          {plant.latinName && (
            <span className="inline-block text-xs bg-primary-light text-primary-dark rounded-full px-4 py-1 mb-1 mr-1 font-medium">
              {plant.latinName}
            </span>
          )}
          <div className="flex flex-wrap gap-4 mb-3 mt-2">
            <div className="bg-blue-50 rounded-xl px-3 py-2 shadow-inner">
              <span className="text-xs text-gray-500">Lichtbedarf:</span>
              <div className="text-sm font-medium text-blue-900">{plant.light}</div>
            </div>
            <div className="bg-blue-50 rounded-xl px-3 py-2 shadow-inner">
              <span className="text-xs text-gray-500">Wasserbedarf:</span>
              <div className="text-sm font-medium text-blue-900">{plant.water}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => inWishlist ? removePlant(plant.id) : addPlant(plant.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-2xl font-bold transition text-base shadow-md focus:outline-none ring-1 ring-primary/30 focus:ring-2 focus:ring-primary/40 ${
                inWishlist
                  ? "bg-primary-light text-primary-dark border border-primary"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              {inWishlist ? "★ In meinen Pflanzen" : "☆ Zu meinen Pflanzen"}
            </button>
          </div>
        </div>
      </div>

      {/* Aufgaben für diese Pflanze anzeigen */}
      {plantReminders.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-3">Anstehende Aufgaben für diese Pflanze:</h3>
          <div className="flex flex-col gap-4 w-full overflow-x-auto">
            {plantReminders.map((reminder) => {
              const { color, icon } = getCardStyleAndIcon(reminder.type);
              return (
                <div
                  key={reminder.id}
                  className={`rounded-2xl shadow flex items-center gap-4 p-4 border-2 ${color} w-full break-words`}
                >
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <span className="flex-1 text-base font-semibold break-words">{getTaskText(reminder)}</span>
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
      )}
    </div>
  );
}