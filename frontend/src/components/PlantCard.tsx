import { Plant } from '../types/plant';
import { useWishlistStore } from '../store/wishlistStore';
import { useNavigate } from 'react-router-dom';

type Props = {
  plant: Plant;
  badge?: string;
  onClick?: () => void;
};

// Visuelles Upgrade für PlantCard:
// - Bild links: quadratisch, stark abgerundet (nicht rund), größer
// - Rechts: Name groß und fett, lateinischer Name als Badge darunter
// - Card stark abgerundet, mehr Schatten
// - Optional: Hintergrund zart eingefärbt (z. B. grün/blau)
// - Favoriten-Stern harmonischer, Badge bleibt

export default function PlantCard({
  plant,
  badge,
  onClick,
}: Props) {
  const navigate = useNavigate();
  const { wishlist, addPlant, removePlant } = useWishlistStore();
  const inWishlist = wishlist.some(p => p.id === plant.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removePlant(plant.id);
    } else {
      addPlant(plant.id);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/plants/${plant.id}`);
  };

  return (
    <article
      className="bg-gradient-to-r from-green-50 via-blue-50 to-white rounded-3xl shadow-lg p-4 flex gap-6 items-center hover:shadow-xl transition relative cursor-pointer border border-primary/10"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`Details zu ${plant.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleCardClick(e as any);
      }}
    >
      <img
        src={plant.image && plant.image.trim() !== "" ? plant.image : "/placeholder-plant.jpg"}
        alt={`Foto der Pflanze ${plant.name}`}
        className="w-24 h-24 rounded-2xl object-cover border border-primary/20 bg-white flex-shrink-0 shadow"
      />
      <div className="flex-1 min-w-0">
        <h3
          className="text-xl font-bold text-primary-dark truncate max-w-[14rem] cursor-pointer mb-1"
          title={plant.name}
        >
          {plant.name}
        </h3>
        {/* Lateinischer Name als Badge (wenn vorhanden) */}
        {plant.latinName && (
          <span className="inline-block text-xs bg-primary-light text-primary-dark rounded-full px-3 py-0.5 mb-1 mr-1">
            {plant.latinName}
          </span>
        )}
        <p className="text-xs sm:text-sm text-gray-700 mb-1">
          {plant.light && `Licht: ${plant.light}`} {plant.water && `• Wasser: ${plant.water}`}
        </p>
        {badge && (() => {
          const badgeColor = badge?.includes("Umtopfen")
            ? "bg-red-500 text-white"
            : badge?.includes("Düngen")
            ? "bg-yellow-400 text-black"
            : badge?.includes("Gießen")
            ? "bg-blue-500 text-white"
            : "bg-primary-light text-primary-dark";
          return (
            <span className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded ${badgeColor}`}>
              {badge}
            </span>
          );
        })()}
      </div>
      {/* Favoriten-Stern oben rechts, jetzt harmonischer */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-4 text-2xl focus:outline-none bg-white/70 rounded-full p-1 shadow"
        aria-label={inWishlist ? "Aus meinen Pflanzen entfernen" : "Zu meinen Pflanzen hinzufügen"}
        title={inWishlist ? "Aus meinen Pflanzen entfernen" : "Zu meinen Pflanzen hinzufügen"}
      >
        {inWishlist ? "★" : "☆"}
      </button>
      {onClick && (
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          aria-label={`Details zu ${plant.name}`}
          className="text-sm text-primary-dark hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
        >
          &nbsp;
        </button>
      )}
    </article>
  );
}