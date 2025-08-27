import { FC, SVGProps } from 'react';

export interface WeatherData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  current: CurrentWeather;
  daily: DailyForecast[];
}

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  precipitationProbability: number;
}

export interface WeatherInterpretation {
    description: string;
    Icon: FC<SVGProps<SVGSVGElement>>;
}

export interface CitySuggestion {
  id: number;
  name:string;
  country: string;
  latitude: number;
  longitude: number;
}