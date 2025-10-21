import type { Timezone } from '../lib/timezones';
import type { ClockMode } from '../lib/types';
import { useClockTime } from '../lib/hooks/useClockTime';
import { ClockFace } from './clock/ClockFace';
import { ClockInfo } from './clock/ClockInfo';

interface ClockDisplayProps {
  timezone: Timezone;
  isHighlighted?: boolean;
  clockMode?: ClockMode;
}

export function ClockDisplay({ timezone, isHighlighted = false, clockMode = 'digital' }: ClockDisplayProps) {
  const clockTimeInfo = useClockTime(timezone.id);

  const displayClasses = isHighlighted 
    ? "terminal-panel-active clock-display-enhanced p-4 h-full" 
    : "terminal-panel clock-display-enhanced p-4 cursor-pointer h-full";

  const renderDigitalClock = () => (
    <div className="flex flex-col items-center justify-center h-full relative">
      <ClockInfo
        timezone={timezone}
        timeInfo={clockTimeInfo.timeInfo}
        timezoneOffset={clockTimeInfo.timezoneOffset}
        dayNightIndicator={clockTimeInfo.dayNightIndicator}
        size="lg"
        showDate={true}
        showTimezone={true}
        className="w-full"
      />
    </div>
  );

  const renderAnalogClock = () => (
    <div className="flex flex-col items-center h-full justify-center">
      {/* Analog clock face */}
      <div className="terminal-globe mb-3 relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
        <ClockFace
          timeInfo={clockTimeInfo.timeInfo}
          smoothSeconds={clockTimeInfo.smoothSeconds}
          size={128}
          showNumbers={true}
          showSecondHand={true}
          gradientId={`analog-${timezone.id}`}
        />
        
        {/* Day/Night indicator overlay */}
        <div className="absolute top-2 right-2 text-xs text-green-500 day-night-indicator">
          {clockTimeInfo.dayNightIndicator}
        </div>
      </div>
      
      {/* Clock information */}
      <ClockInfo
        timezone={timezone}
        timeInfo={clockTimeInfo.timeInfo}
        timezoneOffset={clockTimeInfo.timezoneOffset}
        dayNightIndicator={clockTimeInfo.dayNightIndicator}
        size="md"
        showDate={true}
        showTimezone={true}
        className="w-full"
      />
    </div>
  );

  const renderHybridClock = () => (
    <div className="flex flex-col items-center h-full justify-center">
      {/* Analog clock with superimposed digital time */}
      <div className="terminal-globe mb-3 flex-shrink-0 relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
        <ClockFace
          timeInfo={clockTimeInfo.timeInfo}
          smoothSeconds={clockTimeInfo.smoothSeconds}
          size={128}
          showNumbers={true}
          showSecondHand={false}
          gradientId={`hybrid-${timezone.id}`}
        />
        
        {/* Digital time superimposed over the clock */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-green-300 font-mono font-bold text-xs sm:text-sm md:text-base bg-black/60 px-1 py-0.5 rounded">
            {clockTimeInfo.timeInfo.hours.toString().padStart(2, '0')}:
            {clockTimeInfo.timeInfo.minutes.toString().padStart(2, '0')}
          </div>
        </div>
        
        {/* Day/Night indicator */}
        <div className="absolute top-1 right-1 text-xs text-green-500 day-night-indicator">
          {clockTimeInfo.dayNightIndicator}
        </div>
      </div>
      
      {/* Clock info below (without time since it's shown on the clock) */}
      <div className="flex-shrink-0 w-full text-center">
        {/* City name */}
        <div className="text-green-400 font-bold uppercase mb-1 text-sm clock-city-name">
          {timezone.city}
        </div>
        
        {/* Country and timezone name */}
        <div className="text-green-600 mb-2 text-xs">
          {timezone.country}
          {timezone.name !== timezone.city && (
            <span className="text-green-500"> • {timezone.name}</span>
          )}
        </div>
        
        {/* Date */}
        <div className="text-green-500 mb-2 text-xs">
          {clockTimeInfo.timeInfo.date}
        </div>
        
        {/* Timezone offset */}
        <div className="text-green-600 text-xs">
          UTC{clockTimeInfo.timezoneOffset}
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