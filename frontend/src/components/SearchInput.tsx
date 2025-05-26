import { useEffect, useState } from "react";

const MAX_HISTORY = 5;
const STORAGE_KEY = "plantSearchHistory";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSearchHistory(JSON.parse(stored));
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const updatedHistory = [searchTerm, ...searchHistory.filter(s => s !== searchTerm)].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);

    console.log("Suche ausgeführt:", searchTerm);
    setSearchTerm("");
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pflanze suchen (z. B. Monstera)"
          aria-label="Suchbegriff für Pflanzen"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Suchen
        </button>
      </form>

      {searchHistory.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Letzte Suchen</h3>
          <ul className="flex flex-wrap gap-2">
            {searchHistory.map((term, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setSearchTerm(term)}
                  aria-label={`Suche nach ${term}`}
                  className="px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200"
                >
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}