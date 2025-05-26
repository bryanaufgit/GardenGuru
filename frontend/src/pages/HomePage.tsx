import { PlantList } from '../components/PlantList';
import PageWrapper from "../components/PageWrapper";
import { useEffect } from "react";
import { usePlantStore } from "../store/plantStore";
import Button from "../components/Button";
import SectionTitle from '../components/SectionTitle';

export default function HomePage() {
  const { fetchPlants } = usePlantStore();

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <PageWrapper>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">GardenGuru</h1>
        <p className="text-gray-600">inDev Pre Alpha</p>
      </div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8">
        {/* Aufgaben-Boxen (2/3 Spalten) */}
        <div className="lg:col-span-2 space-y-4">
          <SectionTitle>Anstehende Aufgaben</SectionTitle>
          <PlantList />
        </div>

        {/* Rechte Spalte: Fortschrittsanzeige */}
        <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Levelsystem</h2>
          <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary flex items-center justify-center mb-4">
            <span className="text-sm text-primary font-medium">Bald verfügbar</span>
          </div>
          <p className="text-sm text-gray-500">Level, XP und Meilensteine folgen in Kürze.</p>
        </div>
      </div>
    </PageWrapper>
  );
}
