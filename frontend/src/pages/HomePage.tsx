import { PlantList } from '../components/PlantList';

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🌿 Meine Pflanzen</h1>
      <PlantList />
    </div>
  );
}