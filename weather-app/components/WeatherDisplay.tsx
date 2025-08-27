import React, { useState, useEffect } from 'react';
import { WeatherData, DailyForecast } from '../types';
import { getWeatherInterpretation } from '../services/weatherService';
import { IconWind, IconMapPin, IconNavigation, IconDroplet } from './Icons';

interface ForecastDayProps {
  day: DailyForecast;
  convertTemp: (celsius: number) => number;
}

const ForecastDay: React.FC<ForecastDayProps> = ({ day, convertTemp }) => {
  const { Icon } = getWeatherInterpretation(day.weatherCode, true);
  const date = new Date(day.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="flex flex-col items-center space-y-2 text-center p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 w-24">
      <p className="font-medium text-sm">{dayName.toUpperCase()}</p>
      <Icon className="w-10 h-10" />
      <p>
        <span className="font-bold">{convertTemp(day.maxTemp)}°</span>
        <span className="text-white/70"> / {convertTemp(day.minTemp)}°</span>
      </p>
      <div className="flex items-center gap-1 text-sm text-blue-200">
        <IconDroplet className="w-4 h-4" />
        <span>{day.precipitationProbability}%</span>
      </div>
    </div>
  );
};

interface WeatherDisplayProps {
  weather: WeatherData;
  unit: 'C' | 'F';
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, unit }) => {
  const { description, Icon } = getWeatherInterpretation(weather.current.weatherCode, weather.current.isDay);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const today = new Date();

  useEffect(() => {
    // Trigger animation when weather data changes
    setIsIconVisible(false);
    const timer = setTimeout(() => setIsIconVisible(true), 100);
    return () => clearTimeout(timer);
  }, [weather]);

  const convertTemp = (celsius: number): number => {
    if (unit === 'F') {
      return Math.round(celsius * 9 / 5 + 32);
    }
    return celsius;
  };

  const degreesToCardinal = (deg: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Current Weather Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <IconMapPin className="w-5 h-5"/>
            <h2 className="text-3xl font-bold">{weather.city}, {weather.country}</h2>
          </div>
          <p className="text-lg text-white/80">{today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-xl capitalize mt-2">{description}</p>
        </div>
        <div className="flex items-center gap-6">
          <Icon className={`w-24 h-24 transition-all duration-500 ease-in-out ${isIconVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
          <div>
            <p className="text-6xl font-extrabold">{convertTemp(weather.current.temperature)}°{unit}</p>
            <div className="flex items-center gap-4 mt-1 text-white/80">
                <div className="flex items-center gap-2">
                    <IconWind className="w-5 h-5" />
                    <span>{weather.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-1">
                    <IconNavigation className="w-4 h-4 transition-transform" style={{ transform: `rotate(${weather.current.windDirection}deg)` }} />
                    <span>{degreesToCardinal(weather.current.windDirection)}</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
        <div className="flex overflow-x-auto scrolling-touch gap-2 pb-2 -mx-2 px-2">
          {weather.daily.map((day) => (
            <ForecastDay key={day.date} day={day} convertTemp={convertTemp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;