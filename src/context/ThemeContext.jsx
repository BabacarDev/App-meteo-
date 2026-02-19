import { createContext, useState } from 'react';

// 1. On fabrique le haut-parleur (le Contexte)
export const ThemeContext = createContext();

// 2. On crée la cabine d'annonce (le Provider)
export function ThemeProvider({ children }) {
  // Un petit carnet de notes juste pour retenir si on est en 'light' ou 'dark'
  const [theme, setTheme] = useState('light'); 

  // La fonction pour appuyer sur l'interrupteur
  const toggleTheme = () => {
    setTheme((themeActuel) => (themeActuel === 'light' ? 'dark' : 'light'));
  };

  return (
    // On branche le micro et on donne accès à la variable "theme" et au bouton "toggleTheme"
    // Le mot "children" représente tous les composants qui seront à l'intérieur de notre application
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}