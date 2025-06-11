import { Plant } from '../types/plant';

export async function fetchPlants(): Promise<Plant[]> {
    const response = await fetch('https://gardenguru-2v3b.onrender.com/api/plants');
    if (!response.ok) throw new Error('Fehler beim Abrufen der Pflanzen');
    return response.json();
}