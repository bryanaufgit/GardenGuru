import { useEffect } from 'react';
import { usePlantStore } from '../store/plantStore';
import LoadingIndicator from './LoadingIndicator';
import EmptyState from './EmptyState';
import PlantCard from './PlantCard';

export function PlantList() {
  const { plants, fetchPlants, isLoading } = usePlantStore();

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (plants.length === 0) {
    return <EmptyState message="Du hast noch keine Pflanzen hinzugefügt." />;
  }

  return (
    {/* <div className="grid gap-6 sm:grid-cols-2">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          name={plant.name}
          waterNeed={plant.water}
          lightNeed={plant.light}
          imageUrl={plant.image}
          badge={plant.latinName}
        />
      ))}
    </div> */}
  );
}