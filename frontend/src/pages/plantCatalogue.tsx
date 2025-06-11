import React, { useEffect, useState } from "react";
import { usePlantStore } from "../store/plantStore";
import PlantCard from '../components/PlantCard';
import SearchInput from '../components/SearchInput';

const PlantCatalogPage: React.FC = () => {
  const { plants, isLoading, error, fetchPlants } = usePlantStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  // Filterfunktion für Pflanzen
  const filteredPlants = plants.filter((plant) => {
    const term = searchTerm.trim().toLowerCase();
    return (
      plant.name.toLowerCase().includes(term) ||
      plant.latinName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary-dark">Pflanzenkatalog</h1>
      <div className="mb-4 flex gap-2 items-center">
        <SearchInput onSearch={setSearchTerm} />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="ml-2 text-sm px-3 py-1 bg-primary-light hover:bg-primary text-primary-dark rounded transition-colors"
            aria-label="Filter zurücksetzen"
          >
            Filter zurücksetzen
          </button>
        )}
      </div>
      {isLoading && <p className="text-primary-dark">Lädt Pflanzen ...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlants.length === 0 && !isLoading && (
          <p className="text-gray-500">Keine Pflanzen gefunden.</p>
        )}
        {filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default PlantCatalogPage;