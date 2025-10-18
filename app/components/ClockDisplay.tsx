import { useState, useEffect } from 'react';
import type { Timezone } from '../lib/timezones';
import { getCurrentTime, getTimezoneOffset } from '../lib/timezones';

type ClockMode = 'digital' | 'analog' | 'hybrid';

interface ClockDisplayProps {
  timezone: Timezone;
  isHighlighted?: boolean;
  clockMode?: ClockMode;
}

export function ClockDisplay({ timezone, isHighlighted = false, clockMode = 'digital' }: ClockDisplayProps) {
  const [timeInfo, setTimeInfo] = useState(() => getCurrentTime(timezone.id));
  const [globalSeconds, setGlobalSeconds] = useState(new Date().getSeconds());
  const [smoothSeconds, setSmoothSeconds] = useState(() => {
    const now = new Date();
    return now.getSeconds() + now.getMilliseconds() / 1000;
  });
  const [timezoneOffset, setTimezoneOffset] = useState(() => getTimezoneOffset(timezone.id));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setGlobalSeconds(now.getSeconds());
      setSmoothSeconds(now.getSeconds() + now.getMilliseconds() / 1000);
      setTimeInfo(getCurrentTime(timezone.id));
      setTimezoneOffset(getTimezoneOffset(timezone.id));
    }, 50);

    return () => clearInterval(interval);
  }, [timezone.id]);

  // Determine if it's day or night based on hour
  const isDayTime = timeInfo.hours >= 6 && timeInfo.hours < 18;
  const dayNightIndicator = isDayTime ? '[DAY]' : '[NIGHT]';

  const displayClasses = isHighlighted 
    ? "terminal-panel-active clock-display-enhanced p-4  h-full" 
    : "terminal-panel clock-display-enhanced p-4 cursor-pointer h-full";

  const renderDigitalClock = () => (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Header with city and country */}
      <div className="text-center mb-3 w-full">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-xs text-green-500 day-night-indicator">{dayNightIndicator}</span>
          <div className="text-sm text-green-400 uppercase font-bold clock-city-name">
            {timezone.city}
          </div>
        </div>
        <div className="text-xs text-green-600 mb-1">
          {timezone.country}
        </div>
        <div className="text-xs text-green-500">
          {timezone.name}
        </div>
      </div>

      {/* Main time display */}
      <div className="text-center mb-3 flex-1 flex flex-col justify-center">
        <div className="text-3xl font-bold text-green-300 mb-2 tracking-wider clock-time-display">
          {timeInfo.time}
        </div>
        <div className="text-sm text-green-500 font-mono">
          {timeInfo.date}
        </div>
      </div>

      {/* Timezone offset and additional info */}
      <div className="text-center text-xs text-green-600 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span>UTC{timezoneOffset}</span>
          <span className="text-green-500">•</span>
          <span>{timezone.id.split('/')[1]?.replace('_', ' ')}</span>
        </div>
        <div className="text-green-500">
          {dayNightIndicator}
        </div>
      </div>
    </div>
  );

  const renderAnalogClock = () => (
    <div className="flex flex-col items-center h-full justify-center">
      {/* Analog clock face */}
      <div className="terminal-globe mb-3 relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Outer ring with gradient */}
          <defs>
            <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4"/>
            </linearGradient>
            <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e"/>
              <stop offset="100%" stopColor="#16a34a"/>
            </linearGradient>
          </defs>
          
          {/* Clock face background */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="url(#clockGradient)" strokeWidth="2" />
          
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
                strokeWidth={i % 3 === 0 ? "3" : "1.5"}
                opacity={i % 3 === 0 ? "1" : "0.7"}
              />
            );
          })}
          
          {/* Hour numbers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = 50 + Math.cos(angle) * 35;
            const y = 50 + Math.sin(angle) * 35;
            const hour = i === 0 ? 12 : i;
            return (
              <text
                key={`hour-${i}`}
                x={x}
                y={y + 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="6"
                fill="#22c55e"
                fontWeight="bold"
                opacity="0.8"
              >
                {hour}
              </text>
            );
          })}
          
          {/* Hour hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="25" 
            stroke="#22c55e" 
            strokeWidth="4" 
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
            strokeWidth="2.5" 
            strokeLinecap="round"
            transform={`rotate(${timeInfo.minutes * 6 + timeInfo.seconds * 0.1} 50 50)`} 
          />
          
          {/* Second hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="10" 
            stroke="#16a34a" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            transform={`rotate(${smoothSeconds * 6} 50 50)`} 
          />
          
          {/* Center dot */}
          <circle cx="50" cy="50" r="3" fill="#22c55e" />
          <circle cx="50" cy="50" r="1.5" fill="#16a34a" />
        </svg>
        
        {/* Day/Night indicator overlay */}
        <div className="absolute top-2 right-2 text-xs text-green-500 day-night-indicator">
          {dayNightIndicator}
        </div>
      </div>
      
      {/* Clock information */}
      <div className="text-center w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="text-sm text-green-400 uppercase font-bold clock-city-name">
            {timezone.city}
          </div>
        </div>
        <div className="text-xs text-green-600 mb-2">
          {timezone.country} • {timezone.name}
        </div>
        <div className="text-lg font-bold text-green-300 mb-1 font-mono clock-time-display">
          {timeInfo.time}
        </div>
        <div className="text-xs text-green-500 mb-2">
          {timeInfo.date}
        </div>
        <div className="text-xs text-green-600 space-y-1">
          <div>UTC{timezoneOffset}</div>
          <div className="text-green-500">
            {dayNightIndicator}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHybridClock = () => (
    <div className="flex flex-col items-center h-full justify-center">
      {/* Compact analog clock */}
      <div className="terminal-globe mb-3 flex-shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="hybridClockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          
          <circle cx="50" cy="50" r="48" fill="none" stroke="url(#hybridClockGradient)" strokeWidth="1.5" />
          
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
                opacity={i % 3 === 0 ? "1" : "0.6"}
              />
            );
          })}
          
          {/* Clock hands */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="25" 
            stroke="#22c55e" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            transform={`rotate(${(timeInfo.hours % 12) * 30 + timeInfo.minutes * 0.5} 50 50)`} 
          />
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="15" 
            stroke="#22c55e" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            transform={`rotate(${timeInfo.minutes * 6 + timeInfo.seconds * 0.1} 50 50)`} 
          />
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="10" 
            stroke="#16a34a" 
            strokeWidth="1" 
            strokeLinecap="round"
            transform={`rotate(${smoothSeconds * 6} 50 50)`} 
          />
          <circle cx="50" cy="50" r="2" fill="#22c55e" />
        </svg>
        
        {/* Day/Night indicator */}
        <div className="absolute top-1 right-1 text-xs text-green-500 day-night-indicator">
          {dayNightIndicator}
        </div>
      </div>
      
      {/* Digital time and info */}
      <div className="text-center flex-shrink-0 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="text-sm text-green-400 uppercase font-bold clock-city-name">
            {timezone.city}
          </div>
        </div>
        <div className="text-xs text-green-600 mb-2">
          {timezone.country} • {timezone.name}
        </div>
        <div className="text-2xl font-bold text-green-300 mb-1 font-mono clock-time-display">
          {timeInfo.time}
        </div>
        <div className="text-xs text-green-500 mb-2">
          {timeInfo.date}
        </div>
        <div className="text-xs text-green-600 space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span>UTC{timezoneOffset}</span>
            <span className="text-green-500">•</span>
            <span>{dayNightIndicator}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className={displayClasses}
    >
      {clockMode === 'digital' && renderDigitalClock()}
      {clockMode === 'analog' && renderAnalogClock()}
      {clockMode === 'hybrid' && renderHybridClock()}
    </div>
  );
}