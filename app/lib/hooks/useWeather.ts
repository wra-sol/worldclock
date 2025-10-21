import { useState, useEffect } from 'react';
import type { WeatherData } from '../types';
import { useCachedIPLocation } from './useCachedIPLocation';

export function useWeather(publicIP: string) {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    condition: '',
    icon: '',
    location: '',
    isLoading: true,
  });

  const { locationData, isLoading: locationLoading, error: locationError } = useCachedIPLocation(publicIP);

  useEffect(() => {
    if (!publicIP || publicIP === 'Loading...' || publicIP === 'Unknown') {
      return;
    }

    if (locationLoading) {
      setWeather(prev => ({ ...prev, isLoading: true, error: undefined }));
      return;
    }

    if (locationError || !locationData) {
      setWeather(prev => ({
        ...prev,
        isLoading: false,
        error: locationError || 'Failed to get location data',
      }));
      return;
    }

    const fetchWeather = async () => {
      try {
        setWeather(prev => ({ ...prev, isLoading: true, error: undefined }));
        
        const { latitude, longitude, city, region } = locationData;

        // Get weather data using Open-Meteo API (free, no API key required)
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`;
        
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
          throw new Error(`Failed to get weather: ${weatherResponse.status} ${weatherResponse.statusText}`);
        }
        
        const weatherData = await weatherResponse.json();
        
        if (weatherData.error) {
          throw new Error(weatherData.error || 'Weather API error');
        }
        
        // Map Open-Meteo data to our format
        const currentWeather = weatherData.current_weather;
        const temperature = currentWeather.temperature;
        const weatherCode = currentWeather.weathercode;
        
        // Map WMO weather codes to our icon format
        const getWeatherIcon = (code: number) => {
          // WMO Weather interpretation codes (https://open-meteo.com/docs/weathereather-variables)
          if (code === 0) return '01d'; // Clear sky
          if (code === 1 || code === 2 || code === 3) return '02d'; // Mainly clear, partly cloudy, overcast
          if (code >= 45 && code <= 48) return '50d'; // Fog and depositing rime fog
          if (code >= 51 && code <= 57) return '10d'; // Drizzle
          if (code >= 61 && code <= 67) return '09d'; // Rain
          if (code >= 71 && code <= 77) return '13d'; // Snow fall
          if (code >= 80 && code <= 82) return '09d'; // Rain showers
          if (code >= 85 && code <= 86) return '13d'; // Snow showers
          if (code >= 95 && code <= 99) return '11d'; // Thunderstorm
          return '01d'; // Default to clear
        };
        
        const getWeatherCondition = (code: number) => {
          if (code === 0) return 'Clear sky';
          if (code === 1) return 'Mainly clear';
          if (code === 2) return 'Partly cloudy';
          if (code === 3) return 'Overcast';
          if (code >= 45 && code <= 48) return 'Fog';
          if (code >= 51 && code <= 57) return 'Drizzle';
          if (code >= 61 && code <= 67) return 'Rain';
          if (code >= 71 && code <= 77) return 'Snow';
          if (code >= 80 && code <= 82) return 'Rain showers';
          if (code >= 85 && code <= 86) return 'Snow showers';
          if (code >= 95 && code <= 99) return 'Thunderstorm';
          return 'Unknown';
        };
        
        setWeather({
          temperature: Math.round(temperature),
          condition: getWeatherCondition(weatherCode),
          icon: getWeatherIcon(weatherCode),
          location: `${city}, ${region}`,
          isLoading: false,
        });
      } catch (error) {
        console.error('Weather fetch error:', error);
        setWeather(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load weather',
        }));
      }
    };

    fetchWeather();
  }, [publicIP]);

  return weather;
}
