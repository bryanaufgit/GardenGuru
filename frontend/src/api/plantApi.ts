import { Plant } from '../types/plant';

export async function fetchPlants(): Promise<Plant[]> {
    const response = await fetch('http://localhost:4000/api/plants');
    if (!response.ok) throw new Error('Fehler beim Abrufen der Pflanzen');
    return response.json();
  }