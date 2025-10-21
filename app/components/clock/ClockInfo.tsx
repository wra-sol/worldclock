import type { Timezone } from '../../lib/timezones';
import type { ClockTimeInfo } from '../../lib/hooks/useClockTime';

interface ClockInfoProps {
  timezone: Timezone;
  timeInfo: ClockTimeInfo['timeInfo'];
  timezoneOffset: string;
  dayNightIndicator: string;
  size?: 'sm' | 'md' | 'lg';
  showDate?: boolean;
  showTimezone?: boolean;
  className?: string;
}

export function ClockInfo({
  timezone,
  timeInfo,
  timezoneOffset,
  dayNightIndicator,
  size = 'md',
  showDate = true,
  showTimezone = true,
  className = '',
}: ClockInfoProps) {
  const sizeClasses = {
    sm: {
      city: 'text-xs',
      country: 'text-xs',
      time: 'text-sm',
      date: 'text-xs',
      offset: 'text-xs',
    },
    md: {
      city: 'text-sm',
      country: 'text-xs',
      time: 'text-lg',
      date: 'text-xs',
      offset: 'text-xs',
    },
    lg: {
      city: 'text-sm',
      country: 'text-xs',
      time: 'text-2xl',
      date: 'text-sm',
      offset: 'text-xs',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`text-center ${className}`}>
      {/* Day/Night indicator */}
      <div className={`text-green-500 mb-1 ${classes.offset}`}>
        {dayNightIndicator}
      </div>
      
      {/* City name */}
      <div className={`text-green-400 font-bold uppercase mb-1 ${classes.city} clock-city-name`}>
        {timezone.city}
      </div>
      
      {/* Country and timezone name */}
      <div className={`text-green-600 mb-2 ${classes.country}`}>
        {timezone.country}
        {timezone.name !== timezone.city && (
          <span className="text-green-500"> • {timezone.name}</span>
        )}
      </div>
      
      {/* Time display */}
      <div className={`text-green-300 font-mono font-bold mb-1 ${classes.time} clock-time-display`}>
        {timeInfo.hours.toString().padStart(2, '0')}:
        {timeInfo.minutes.toString().padStart(2, '0')}
        {size === 'lg' && `:${timeInfo.seconds.toString().padStart(2, '0')}`}
      </div>
      
      {/* Date */}
      {showDate && (
        <div className={`text-green-500 mb-2 ${classes.date}`}>
          {timeInfo.date}
        </div>
      )}
      
      {/* Timezone offset */}
      {showTimezone && (
        <div className={`text-green-600 ${classes.offset}`}>
          UTC{timezoneOffset}
        </div>
      )}
    </div>
  );
}
