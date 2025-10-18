import type { Timezone } from '../lib/timezones';
import { getCurrentTime, getTimezoneOffset } from '../lib/timezones';

interface AnalogClockProps {
  timezone: Timezone;
  size?: number;
}

export function AnalogClock({ timezone, size = 80 }: AnalogClockProps) {
  const timeInfo = getCurrentTime(timezone.id);
  const timezoneOffset = getTimezoneOffset(timezone.id);
  const { hours, minutes, seconds } = timeInfo;
  
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const secondDegrees = seconds * 6;
  
  // Determine if it's day or night
  const isDayTime = hours >= 6 && hours < 18;
  const dayNightIndicator = isDayTime ? '[DAY]' : '[NIGHT]';
  
  return (
    <div className="terminal-globe relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`clockGradient-${timezone.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4"/>
          </linearGradient>
          <linearGradient id={`handGradient-${timezone.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e"/>
            <stop offset="100%" stopColor="#16a34a"/>
          </linearGradient>
        </defs>
        
        {/* Clock face with gradient */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none" 
          stroke={`url(#clockGradient-${timezone.id})`} 
          strokeWidth="2"
        />
        
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
        
        {/* Hour numbers for larger clocks */}
        {size >= 120 && [...Array(12)].map((_, i) => {
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
          stroke={`url(#handGradient-${timezone.id})`}
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hourDegrees} 50 50)`}
        />
        
        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke={`url(#handGradient-${timezone.id})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${minuteDegrees} 50 50)`}
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
          transform={`rotate(${secondDegrees} 50 50)`}
        />
        
        {/* Center dot */}
        <circle cx="50" cy="50" r="3" fill="#22c55e" />
        <circle cx="50" cy="50" r="1.5" fill="#16a34a" />
      </svg>
      
      {/* Day/Night indicator overlay */}
      <div className="absolute top-1 right-1 text-xs text-green-500">
        {dayNightIndicator}
      </div>
      
      {/* Timezone info overlay for larger clocks */}
      {size >= 120 && (
        <div className="absolute bottom-1 left-1 right-1 text-center">
          <div className="text-xs text-green-600 font-mono">
            {timezone.city}
          </div>
          <div className="text-xs text-green-500">
            UTC{timezoneOffset}
          </div>
        </div>
      )}
    </div>
  );
}