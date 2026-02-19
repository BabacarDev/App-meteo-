import Weather from './components/WeatherApp';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
   <ThemeProvider>
      {/* On a ajouté une transition douce pour que le changement de couleur soit joli */}
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <Weather />
      </div>
    </ThemeProvider>
  );
}

export default App;