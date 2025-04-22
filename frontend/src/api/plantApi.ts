export async function fetchPlants() {
    const response = await fetch('http://localhost:4000/plants');
    if (!response.ok) throw new Error('Fehler beim Abrufen der Pflanzen');
    return response.json();
  }