import { RefreshCw } from "lucide-react";
import PlantCard from "../components/PlantCard";
import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";
import { useEffect, useRef } from "react";
import { useWishlistStore } from "../store/wishlistStore";
import { useUserStore } from "../store/userStore";

export default function MyPlants() {
  const { wishlist, loading, error, loadWishlist, removePlant } = useWishlistStore();
  const { loading: authLoading, token } = useUserStore();
  const didLoadRef = useRef(false);

  useEffect(() => {
    if (!authLoading && token && !didLoadRef.current) {
      loadWishlist();
      didLoadRef.current = true;
    }
  }, [authLoading, token, loadWishlist]);

  return (
    <PageWrapper>
      <SectionTitle>Meine Pflanzen</SectionTitle>
      <div className="flex justify-end mb-2">
        <button
          aria-label="Seite neu laden"
          onClick={() => window.location.reload()}
          className="p-2 rounded-full bg-primary/90 hover:bg-primary text-white shadow focus:outline-none transition"
          title="Seite neu laden"
          type="button"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      {(authLoading || loading) && <p>Lade deine Pflanzen ...</p>}
      {!authLoading && error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {wishlist.length === 0 && !loading && <p>Du hast noch keine Pflanzen hinzugefügt.</p>}
        {wishlist.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            badge="Entfernen"
            onClick={() => removePlant(plant.id)}
          />
        ))}
      </div>
    </PageWrapper>
  );
}