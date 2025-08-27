import { WeatherData, WeatherInterpretation, CitySuggestion } from '../types';
import {
    IconSun, IconMoon, IconCloud, IconCloudSun, IconCloudMoon, IconCloudDrizzle,
    IconCloudRain, IconCloudSnow, IconCloudFog, IconCloudLightning
} from '../components/Icons';

export const getWeatherInterpretation = (code: number, isDay: boolean = true): WeatherInterpretation => {
    const map: Record<number, { description: string; dayIcon: React.FC<any>; nightIcon: React.FC<any> }> = {
        0: { description: "Clear sky", dayIcon: IconSun, nightIcon: IconMoon },
        1: { description: "Mainly clear", dayIcon: IconCloudSun, nightIcon: IconCloudMoon },
        2: { description: "Partly cloudy", dayIcon: IconCloudSun, nightIcon: IconCloudMoon },
        3: { description: "Overcast", dayIcon: IconCloud, nightIcon: IconCloud },
        45: { description: "Fog", dayIcon: IconCloudFog, nightIcon: IconCloudFog },
        48: { description: "Depositing rime fog", dayIcon: IconCloudFog, nightIcon: IconCloudFog },
        51: { description: "Light drizzle", dayIcon: IconCloudDrizzle, nightIcon: IconCloudDrizzle },
        53: { description: "Moderate drizzle", dayIcon: IconCloudDrizzle, nightIcon: IconCloudDrizzle },
        55: { description: "Dense drizzle", dayIcon: IconCloudDrizzle, nightIcon: IconCloudDrizzle },
        56: { description: "Light freezing drizzle", dayIcon: IconCloudDrizzle, nightIcon: IconCloudDrizzle },
        57: { description: "Dense freezing drizzle", dayIcon: IconCloudDrizzle, nightIcon: IconCloudDrizzle },
        61: { description: "Slight rain", dayIcon: IconCloudRain, nightIcon: IconCloudRain },
        63: { description: "Moderate rain", dayIcon: IconCloudRain, nightIcon: IconCloudRain },
        65: { description: "Heavy rain", dayIcon: IconCloudRain, nightIcon: IconCloudRain },
        66: { description: "Light freezing rain", dayIcon: IconCloudRain, nightIcon: IconCloudRain },
        67: { description: "Heavy freezing rain", dayIcon: IconCloudRain, nightIcon: IconCloudRain },
        71: { description: "Slight snow fall", dayIcon: IconCloudSnow, nightIcon: IconCloudSnow },
        73: { description: "Moderate snow fall", dayIcon: IconCloudSnow, nightIcon: IconCloudSnow },
        75: { description: "Heavy snow fall", dayIcon: IconCloudSnow, nightIcon: IconCloudSnow },
        77: { description: "Snow grains", dayIcon: IconCloudSnow, nightIcon: IconCloudSnow },
        80: { description: "Slight rain showers", dayIcon: IconCloudRain, nightIcon: IconCloudRain },
        81: { description: "Moderate rain showers", dayIcon: IconCloudRain, nightIcon: IconCloudRain },
        82: { description: "Violent rain showers", dayIcon: IconCloudRain, nightIcon: IconCloudRain },
        85: { description: "Slight snow showers", dayIcon: IconCloudSnow, nightIcon: IconCloudSnow },
        86: { description: "Heavy snow showers", dayIcon: IconCloudSnow, nightIcon: IconCloudSnow },
        95: { description: "Thunderstorm", dayIcon: IconCloudLightning, nightIcon: IconCloudLightning },
        96: { description: "Slight hail", dayIcon: IconCloudLightning, nightIcon: IconCloudLightning },
        99: { description: "Heavy hail", dayIcon: IconCloudLightning, nightIcon: IconCloudLightning },
    };
    const interpretation = map[code] || { description: "Unknown", dayIcon: IconSun, nightIcon: IconMoon };
    return {
        description: interpretation.description,
        Icon: isDay ? interpretation.dayIcon : interpretation.nightIcon,
    };
};


async function fetchWeatherAPI(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
    }
    return response.json();
}

export async function fetchWeatherForCoords(latitude: number, longitude: number): Promise<WeatherData> {
     const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
     const weatherData = await fetchWeatherAPI(weatherUrl);

     // For reverse geocoding to get city name
     const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
     const geoData = await fetchWeatherAPI(geoUrl);
     const city = geoData.address.city || geoData.address.town || geoData.address.village || 'Current Location';
     const country = geoData.address.country || '';


    return {
        city,
        country,
        latitude: weatherData.latitude,
        longitude: weatherData.longitude,
        current: {
            temperature: Math.round(weatherData.current.temperature_2m),
            weatherCode: weatherData.current.weather_code,
            windSpeed: Math.round(weatherData.current.wind_speed_10m),
            windDirection: weatherData.current.wind_direction_10m,
            isDay: weatherData.current.is_day === 1,
        },
        daily: weatherData.daily.time.map((date: string, index: number) => ({
            date,
            weatherCode: weatherData.daily.weather_code[index],
            maxTemp: Math.round(weatherData.daily.temperature_2m_max[index]),
            minTemp: Math.round(weatherData.daily.temperature_2m_min[index]),
            precipitationProbability: weatherData.daily.precipitation_probability_max[index],
        })).slice(0, 7), // 7-day forecast
    };
}


export async function fetchWeatherForCity(city: string): Promise<WeatherData> {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geoData = await fetchWeatherAPI(geoUrl);

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Could not find location: ${city}`);
    }

    const { latitude, longitude, name, country } = geoData.results[0];
    const weatherData = await fetchWeatherForCoords(latitude, longitude);
    
    return { ...weatherData, city: name, country };
}

export async function fetchCitySuggestions(query: string): Promise<CitySuggestion[]> {
    if (query.length < 2) return [];
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    try {
        const data = await fetchWeatherAPI(geoUrl);
        if (!data.results) return [];
        return data.results.map((item: any) => ({
            id: item.id,
            name: item.name,
            country: item.country,
            latitude: item.latitude,
            longitude: item.longitude,
        }));
    } catch (error) {
        console.error("Failed to fetch city suggestions:", error);
        return [];
    }
}