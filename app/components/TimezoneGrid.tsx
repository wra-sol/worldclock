import type { TimezoneGridProps, Timezone } from '../lib/types';
import { ClockDisplay } from './ClockDisplay';
import { getCurrentTime, getTimezoneOffset } from '../lib/timezones';

export function TimezoneGrid({ timezones, highlightedTimezones, onToggleHighlight, clockMode = 'digital' }: TimezoneGridProps) {
  const highlightedIds = new Set(highlightedTimezones.map(tz => tz.id));
  const isHighlighted = (timezone: Timezone) => highlightedIds.has(timezone.id);
  
  const getTimezoneInfo = (timezone: Timezone) => {
    const timeInfo = getCurrentTime(timezone.id);
    const timezoneOffset = getTimezoneOffset(timezone.id);
    const isDayTime = timeInfo.hours >= 6 && timeInfo.hours < 18;
    const dayNightIndicator = isDayTime ? '[DAY]' : '[NIGHT]';
    return { timeInfo, timezoneOffset, isDayTime, dayNightIndicator };
  };

  const renderMiniDigitalClock = (timezone: Timezone, timeInfo: any, timezoneOffset: string, dayNightIndicator: string) => (
    <div className="text-center">
      <div className="text-xs text-green-500 mb-1">{dayNightIndicator}</div>
      <div className="text-green-400 font-bold text-xs sm:text-sm mb-1 truncate">{timezone.city}</div>
      <div className="text-green-300 font-mono text-sm sm:text-base mb-1">
        {timeInfo.hours.toString().padStart(2, '0')}:{timeInfo.minutes.toString().padStart(2, '0')}
      </div>
      <div className="text-green-600 text-xs">
        UTC{timezoneOffset}
      </div>
    </div>
  );

  const renderMiniAnalogClock = (timezone: Timezone, timeInfo: any, timezoneOffset: string, dayNightIndicator: string) => (
    <div className="text-center">
      <div className="flex justify-center mb-1">
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 50 + Math.cos(angle) * 40;
            const y1 = 50 + Math.sin(angle) * 40;
            const x2 = 50 + Math.cos(angle) * 45;
            const y2 = 50 + Math.sin(angle) * 45;
            return (
              <line 
                key={i} 
                x1={x1} 
                y1={y1} 
                x2={x2} 
                y2={y2} 
                stroke="#22c55e" 
                strokeWidth={i % 3 === 0 ? "2" : "1"} 
                opacity={i % 3 === 0 ? "0.8" : "0.4"}
              />
            );
          })}
          
          {/* Hour hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="25" 
            stroke="#22c55e" 
            strokeWidth="2" 
            strokeLinecap="round"
            transform={`rotate(${(timeInfo.hours % 12) * 30 + timeInfo.minutes * 0.5} 50 50)`} 
          />
          
          {/* Minute hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="15" 
            stroke="#16a34a" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            transform={`rotate(${timeInfo.minutes * 6} 50 50)`} 
          />
          
          {/* Center dot */}
          <circle cx="50" cy="50" r="2" fill="#22c55e" />
        </svg>
      </div>
      <div className="text-green-400 font-bold text-xs mb-1 truncate">{timezone.city}</div>
      <div className="text-green-600 text-xs">
        UTC{timezoneOffset}
      </div>
    </div>
  );

  const renderMiniHybridClock = (timezone: Timezone, timeInfo: any, timezoneOffset: string, dayNightIndicator: string) => (
    <div className="text-center">
      <div className="flex justify-center mb-1">
        <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.5" />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 50 + Math.cos(angle) * 42;
            const y1 = 50 + Math.sin(angle) * 42;
            const x2 = 50 + Math.cos(angle) * 46;
            const y2 = 50 + Math.sin(angle) * 46;
            return (
              <line 
                key={i} 
                x1={x1} 
                y1={y1} 
                x2={x2} 
                y2={y2} 
                stroke="#22c55e" 
                strokeWidth="1" 
                opacity={i % 3 === 0 ? "0.6" : "0.3"}
              />
            );
          })}
          
          {/* Hour hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="28" 
            stroke="#22c55e" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            transform={`rotate(${(timeInfo.hours % 12) * 30 + timeInfo.minutes * 0.5} 50 50)`} 
          />
          
          {/* Minute hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="18" 
            stroke="#22c55e" 
            strokeWidth="1" 
            strokeLinecap="round"
            transform={`rotate(${timeInfo.minutes * 6} 50 50)`} 
          />
          
          {/* Center dot */}
          <circle cx="50" cy="50" r="1.5" fill="#22c55e" />
        </svg>
      </div>
      <div className="text-green-400 font-bold text-xs mb-1 truncate">{timezone.city}</div>
      <div className="text-green-300 font-mono text-xs mb-1">
        {timeInfo.hours.toString().padStart(2, '0')}:{timeInfo.minutes.toString().padStart(2, '0')}
      </div>
      <div className="text-green-600 text-xs">
        UTC{timezoneOffset}
      </div>
    </div>
  );

  return (
      <div className="terminal-panel p-2">
        <div className="text-green-600 text-xs mb-2 uppercase">All Zones</div>
        <div className="overflow-y-auto border border-green-600 h-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-1 sm:gap-2 p-1 sm:p-2">
            {timezones.map((timezone) => {
              const { timeInfo, timezoneOffset, dayNightIndicator } = getTimezoneInfo(timezone);
              
              return (
                <div
                  key={timezone.id}
                  className={`terminal-row cursor-pointer p-1 sm:p-2 ${
                    isHighlighted(timezone) ? 'terminal-row-selected' : ''
                  }`}
                  onClick={() => onToggleHighlight(timezone)}
                >
                  {clockMode === 'digital' && renderMiniDigitalClock(timezone, timeInfo, timezoneOffset, dayNightIndicator)}
                  {clockMode === 'analog' && renderMiniAnalogClock(timezone, timeInfo, timezoneOffset, dayNightIndicator)}
                  {clockMode === 'hybrid' && renderMiniHybridClock(timezone, timeInfo, timezoneOffset, dayNightIndicator)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
}