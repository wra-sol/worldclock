import type { WeatherData } from '../lib/types';

interface WeatherWidgetProps {
  weather: WeatherData;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  if (weather.isLoading) {
    return (
      <div className="flex items-center space-x-2 text-green-600 text-xs">
        <div className="animate-pulse">Weather</div>
        <span>Loading weather...</span>
      </div>
    );
  }

  if (weather.error) {
    return (
      <div className="flex items-center space-x-2 text-red-500 text-xs">
        <span>Warning</span>
        <span>Weather unavailable</span>
      </div>
    );
  }

  const getWeatherIcon = (icon: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': 'Clear', '01n': 'Clear',
      '02d': 'Partly Cloudy', '02n': 'Partly Cloudy',
      '03d': 'Cloudy', '03n': 'Cloudy',
      '04d': 'Overcast', '04n': 'Overcast',
      '09d': 'Rain', '09n': 'Rain',
      '10d': 'Light Rain', '10n': 'Light Rain',
      '11d': 'Thunderstorm', '11n': 'Thunderstorm',
      '13d': 'Snow', '13n': 'Snow',
      '50d': 'Fog', '50n': 'Fog',
    };
    return iconMap[icon] || 'Unknown';
  };

  return (
    <div className="flex items-center space-x-2 text-green-600 text-xs">
      <span className="text-lg">{getWeatherIcon(weather.icon)}</span>
      <div className="flex flex-col">
        <span className="font-mono">
          {weather.temperature}°C
        </span>
        <span className="text-xs opacity-75 truncate max-w-24">
          {weather.location}
        </span>
      </div>
    </div>
  );
}
