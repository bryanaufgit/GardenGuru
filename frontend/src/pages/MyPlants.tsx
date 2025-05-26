import PlantCard from "../components/PlantCard";
import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";
import { useEffect } from "react";
import { usePlantStore } from "../store/plantStore";

export default function MyPlants() {
  const { plants, fetchPlants } = usePlantStore();

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <PageWrapper>
      <SectionTitle>Meine Pflanzen</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            name={plant.name}
            waterNeed={plant.water}
            lightNeed={plant.light}
            //badge={`Letztes Update: ${plant.updatedAt?.slice(0, 10) ?? "unbekannt"}`}
          />
        ))}
      </div>
    </PageWrapper>
  );
}