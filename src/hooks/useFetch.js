import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    // On déclare notre fonction asynchrone à l'intérieur du useEffect
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Oups, impossible de récupérer la météo !");
        }
        
        // On attend la transformation en JSON
        const donnees = await response.json();
        setData(donnees);
        
      } catch (err) {
        // S'il y a un problème (réseau, URL cassée, etc.), on atterrit ici
        setError(err.message);
        
      } finally {
        // Le bloc 'finally' s'exécute toujours à la fin, qu'il y ait eu une erreur ou un succès
        setLoading(false);
      }
    };

    // On n'oublie pas d'exécuter la fonction qu'on vient de créer !
    fetchData();

  }, [url]);

  return { data, loading, error };
}