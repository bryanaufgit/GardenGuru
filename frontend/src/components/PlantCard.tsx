type Props = {
    name: string;
    imageUrl?: string;
    waterNeed?: string;
    lightNeed?: string;
    badge?: string;
    onClick?: () => void;
  };
  
  export default function PlantCard({
    name,
    imageUrl,
    waterNeed,
    lightNeed,
    badge,
    onClick,
  }: Props) {
    return (
      <article className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center hover:bg-primary-light transition">
        <img
          src={imageUrl && imageUrl.trim() !== "" ? imageUrl : "/placeholder-plant.jpg"}
          alt={`Foto der Pflanze ${name}`}
          className="w-20 h-20 aspect-square rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-primary-dark">{name}</h3>
          <p className="text-xs sm:text-sm text-gray-700">
            {lightNeed && `Licht: ${lightNeed}`} {waterNeed && `• Wasser: ${waterNeed}`}
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
        {onClick && (
          <button
            onClick={onClick}
            aria-label={`Details zu ${name}`}
            className="text-sm text-primary-dark hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Details
          </button>
        )}
      </article>
    );
  }