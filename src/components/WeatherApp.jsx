import { useState, useRef, useEffect, useContext } from 'react';
import { useFetch } from '../hooks/useFetch';
import { ThemeContext } from '../context/ThemeContext';

export default function Weather() {
    const { theme, toggleTheme } = useContext(ThemeContext);

  // NOUVEAU : On prépare les couleurs selon le thème actuel
  const fondCarte = theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white';
  // 1. On prépare les états pour stocker ce que l'utilisateur tape.
  // J'ai mis des coordonnées par défaut (Dakar) pour qu'on ait un résultat tout de suite !
  const [inputLat, setInputLat] = useState('14.69'); 
  const [inputLng, setInputLng] = useState('-17.44'); 

  // 2. On stocke l'URL finale qui sera envoyée à notre hook useFetch.
  const [searchUrl, setSearchUrl] = useState(
    `https://api.open-meteo.com/v1/forecast?latitude=14.69&longitude=-17.44&current_weather=true`
  );

  // 3. On crée notre "étiquette" useRef pour cibler le champ latitude.
  const latInputRef = useRef(null);

  // 4. On appelle notre hook personnalisé magique !
  const { data, loading, error } = useFetch(searchUrl);

  // 5. Le focus automatique au démarrage avec useEffect
  useEffect(() => {
    // Dès que le composant apparaît à l'écran, on force le curseur dans cet input
    if (latInputRef.current) {
      latInputRef.current.focus();
    }
  }, []); // Le [] vide signifie : "fais-le uniquement au premier chargement"

  // 6. La fonction déclenchée quand on clique sur "Rechercher"
  const handleSearch = (e) => {
    e.preventDefault(); // Empêche la page de se recharger (comportement par défaut des formulaires)
    
    // On met à jour l'URL avec les nouvelles coordonnées tapées
    setSearchUrl(
      `https://api.open-meteo.com/v1/forecast?latitude=${inputLat}&longitude=${inputLng}&current_weather=true`
    );
  };

  return (
    // On remplace "bg-white" par notre variable "fondCarte"
    <div className={`${fondCarte} p-8 rounded-xl shadow-lg w-full max-w-md transition-colors duration-300`}>
      
      {/* NOUVEAU : Le bouton magique pour changer le thème */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleTheme}
          className="text-sm px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {theme === 'light' ? 'Passer en Sombre 🌙' : 'Passer en Clair ☀️'}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Météo en Direct 🌤️</h2>

      {/* Le formulaire de recherche */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          ref={latInputRef} /* On colle notre étiquette useRef ici ! */
          type="number"
          step="any"
          placeholder="Latitude"
          value={inputLat}
          onChange={(e) => setInputLat(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={inputLng}
          onChange={(e) => setInputLng(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          🔍
        </button>
      </form>

      {/* L'affichage des résultats géré par notre useFetch */}
      <div className="min-h-[150px] flex items-center justify-center">
        {loading && (
          <p className="text-blue-500 font-medium animate-pulse">Chargement des nuages...</p>
        )}
        
        {error && (
          <p className="text-red-500 font-medium text-center">{error}</p>
        )}

        {data && !loading && !error && (
          <div className="text-center w-full">
            <p className="text-sm text-gray-500 mb-1">Coordonnées : {inputLat}, {inputLng}</p>
            <p className="text-6xl font-extrabold text-blue-600 my-4">
              {data.current_weather.temperature}°C
            </p>
            <div className="flex justify-center gap-4 text-gray-600 font-medium">
              <p>💨 Vent : {data.current_weather.windspeed} km/h</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}