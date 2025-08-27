import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData, CitySuggestion } from './types';
import { fetchWeatherForCity, fetchWeatherForCoords } from './services/weatherService';
import Loader from './components/Loader';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import UnitToggle from './components/UnitToggle';

const LAST_CITY_STORAGE_KEY = 'weatherAppLastCity';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [savedCity, setSavedCity] = useState<CitySuggestion | null>(null);

  const fetchWeather = useCallback(async (fetcher: () => Promise<WeatherData>) => {
    setError(null);
    try {
      const data = await fetcher();
      setWeather(data);
      // Automatically save the successfully fetched city data if it came from a search
      if (isSearching) {
        const cityToSave = {
          id: data.latitude + data.longitude, // Create a pseudo-ID
          name: data.city,
          country: data.country,
          latitude: data.latitude,
          longitude: data.longitude,
        };
        localStorage.setItem(LAST_CITY_STORAGE_KEY, JSON.stringify(cityToSave));
        setSavedCity(cityToSave);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setWeather(null);
    } finally {
        setIsLoading(false);
        setIsSearching(false);
    }
  }, [isSearching]);
  
  const getInitialWeather = useCallback(() => {
    setIsLoading(true);
    const lastCityJSON = localStorage.getItem(LAST_CITY_STORAGE_KEY);

    if (lastCityJSON) {
        const lastCity = JSON.parse(lastCityJSON) as CitySuggestion;
        setSavedCity(lastCity);
        fetchWeather(() => fetchWeatherForCoords(lastCity.latitude, lastCity.longitude));
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(() => fetchWeatherForCoords(latitude, longitude));
            },
            () => {
                // User denied location, fetch for a default city
                fetchWeather(() => fetchWeatherForCity('London'));
            }
        );
    }
  }, [fetchWeather]);

  useEffect(() => {
    getInitialWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchTarget: CitySuggestion | string) => {
    setIsSearching(true);
    if (typeof searchTarget === 'string') {
      fetchWeather(() => fetchWeatherForCity(searchTarget));
    } else {
      // It's a CitySuggestion object
      fetchWeather(() => fetchWeatherForCoords(searchTarget.latitude, searchTarget.longitude));
    }
  };
  
  const handleClearPreference = () => {
    localStorage.removeItem(LAST_CITY_STORAGE_KEY);
    setSavedCity(null);
    setWeather(null);
    getInitialWeather();
  }

  const renderContent = () => {
    if (isLoading) {
      return <Loader text="Fetching weather data..." />;
    }

    const renderFriendlyError = (errorMsg: string) => {
        let title = "Error";
        let message = "Oops! Something went wrong while fetching the weather. Please try again later.";
        
        if (errorMsg.includes('Could not find location')) {
            title = "Location Not Found";
            message = "Sorry, we couldn't find that city. Please check the spelling and try again.";
        } else if (errorMsg.includes('API call failed')) {
            title = "Service Unavailable";
            message = "The weather service is temporarily unavailable. Please try again in a few moments.";
        } else if (errorMsg.includes('Failed to fetch')) {
             title = "Network Error";
            message = "Please check your internet connection and try again.";
        }

        return (
            <div className="text-center text-white bg-red-500/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="mt-2">{message}</p>
                <button onClick={() => fetchWeather(() => fetchWeatherForCity('London'))} className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">Try a default location</button>
            </div>
        );
    };

    if (error && !isSearching) {
      return renderFriendlyError(error);
    }
    
    const inlineError = () => {
        if (!error || !isSearching) return null;
        let message = "An error occurred.";
        if (error.includes('Could not find location')) {
            message = "Could not find that city. Please check the spelling.";
        } else if (error.includes('Failed to fetch')) {
            message = "Network error. Please check your connection.";
        }
        return <p className="text-red-300 bg-red-900/50 px-4 py-2 rounded-md animate-pulse">{message}</p>;
    }

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <SearchBar onSearch={handleSearch} isLoading={isSearching} />
                <UnitToggle unit={unit} onUnitChange={setUnit} />
            </div>
            {inlineError()}
            {weather && <WeatherDisplay weather={weather} unit={unit} />}
        </div>
    );
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-900 text-white font-sans">
      <main className="w-full max-w-4xl flex flex-col items-center justify-center">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-white/50 text-sm mt-auto">
        <p>Powered by Open-Meteo API. PWA Weather App.</p>
        {savedCity && (
            <button onClick={handleClearPreference} className="mt-2 text-blue-300 hover:text-white underline transition">
                Forget '{savedCity.name}' and use my current location
            </button>
        )}
      </footer>
    </div>
  );
};

export default App;