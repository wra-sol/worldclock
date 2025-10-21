import type { FooterBarProps } from '../lib/types';
import { WeatherWidget } from './WeatherWidget';
import { NewsFeed } from './NewsFeed';

export function FooterBar({ news, weather }: FooterBarProps) {
  return (
    <div className="fixed-footer">
      <div className="flex items-center justify-between p-2 px-4">
        {weather && <WeatherWidget weather={weather} />}
        <NewsFeed news={news} />
      </div>
    </div>
  );
}