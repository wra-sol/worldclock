import { ClockFace } from './ClockFace';
import { ClockInfo } from './ClockInfo';
import type { Timezone } from '../../lib/timezones';
import type { ClockTimeInfo } from '../../lib/hooks/useClockTime';

interface MiniClockProps {
  timezone: Timezone;
  clockTimeInfo: ClockTimeInfo;
  clockMode: 'digital' | 'analog' | 'hybrid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MiniClock({
  timezone,
  clockTimeInfo,
  clockMode,
  size = 'sm',
  className = '',
}: MiniClockProps) {
  const { timeInfo, timezoneOffset, dayNightIndicator, smoothSeconds } = clockTimeInfo;

  const renderDigital = () => (
    <div className={`text-center h-full flex flex-col justify-start ${className}`}>
      <div className="text-sm font-mono text-green-400 mb-1 font-bold">
        {timeInfo.time}
      </div>
      <div className="text-xs text-green-300 font-medium truncate px-1">
        {timezone.city}
      </div>
      <div className="text-xs text-green-600/80 font-mono">
        {timezoneOffset}
      </div>
    </div>
  );

  const renderAnalog = () => renderDigital();

  const renderHybrid = () => renderDigital();

  switch (clockMode) {
    case 'digital':
      return renderDigital();
    case 'analog':
      return renderAnalog();
    case 'hybrid':
      return renderHybrid();
    default:
      return renderDigital();
  }
}
