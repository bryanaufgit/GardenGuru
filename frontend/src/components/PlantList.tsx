import { useEffect } from 'react';
import { usePlantStore } from '../store/plantStore';

export function PlantList() {
  const { plants, fetchPlants } = usePlantStore();

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {plants.map((plant) => (
        <div key={plant.id} className="bg-white rounded shadow p-4">
          <img src={plant.image} alt={plant.name} className="w-full h-40 object-cover rounded" />
          <h2 className="text-xl font-bold mt-2">{plant.name}</h2>
          <p className="italic text-gray-600">{plant.latinName}</p>
          <p>Licht: {plant.light}</p>
          <p>Wasser: {plant.water}</p>
        </div>
      ))}
    </div>
  );
}