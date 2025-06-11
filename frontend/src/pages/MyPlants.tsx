import PlantCard from "../components/PlantCard";
import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";
import { useEffect } from "react";
import { useWishlistStore } from "../store/wishlistStore";

export default function MyPlants() {
  const { wishlist, loading, error, loadWishlist, removePlant } = useWishlistStore();

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  return (
    <PageWrapper>
      <SectionTitle>Meine Pflanzen</SectionTitle>
      {loading && <p>Lade deine Pflanzen ...</p>}
      {error && <p className="text-red-500">{error}</p>}
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