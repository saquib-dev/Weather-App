import React, { useState, useEffect, useRef } from 'react';
import { fetchCitySuggestions } from '../services/weatherService';
import { CitySuggestion } from '../types';

interface SearchBarProps {
  onSearch: (searchTarget: CitySuggestion | string) => void;
  isLoading: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 300);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length > 1) {
        setIsFetchingSuggestions(true);
        try {
            const results = await fetchCitySuggestions(debouncedQuery);
            setSuggestions(results);
            setActiveIndex(-1);
        } catch (error) {
            console.error("Failed to fetch suggestions:", error);
            setSuggestions([]); // Clear suggestions on error
        } finally {
            setIsFetchingSuggestions(false);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (city: CitySuggestion) => {
    setQuery(city.name);
    setSuggestions([]);
    setIsFocused(false);
    onSearch(city);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isFetchingSuggestions || suggestions.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
        setIsFocused(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFocused(false);
    const selectedSuggestion = activeIndex >= 0 ? suggestions[activeIndex] : suggestions[0];

    if (selectedSuggestion) {
      handleSelect(selectedSuggestion);
    } else if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for a city..."
          className="flex-grow p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          type="submit"
          className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold disabled:bg-blue-400 disabled:cursor-not-allowed transition"
          disabled={isLoading || query.trim().length === 0}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Search'
          )}
        </button>
      </form>
      {isFocused && query.length > 1 && (
        <ul className="absolute z-10 w-full mt-2 bg-blue-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
           {isFetchingSuggestions ? (
             <li className="px-4 py-2 text-white/70 italic">Searching...</li>
           ) : suggestions.length > 0 ? (
            suggestions.map((city, index) => (
              <li
                key={city.id}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-700 transition ${index === activeIndex ? 'bg-blue-700' : ''}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(city);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {city.name}, {city.country}
              </li>
            ))
          ) : !isFetchingSuggestions ? (
            <li className="px-4 py-2 text-white/70">No results found for "{query}".</li>
          ) : null}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;