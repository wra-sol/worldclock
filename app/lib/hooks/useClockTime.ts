import { useState, useEffect } from 'react';
import { getCurrentTime, getTimezoneOffset } from '../timezones';
import type { Timezone } from '../timezones';

export interface ClockTimeInfo {
  timeInfo: ReturnType<typeof getCurrentTime>;
  timezoneOffset: string;
  isDayTime: boolean;
  dayNightIndicator: string;
  smoothSeconds: number;
  globalSeconds: number;
}

export function useClockTime(timezoneId: string): ClockTimeInfo {
  const [timeInfo, setTimeInfo] = useState(() => getCurrentTime(timezoneId));
  const [timezoneOffset, setTimezoneOffset] = useState(() => getTimezoneOffset(timezoneId));
  const [globalSeconds, setGlobalSeconds] = useState(new Date().getSeconds());
  const [smoothSeconds, setSmoothSeconds] = useState(() => {
    const now = new Date();
    return now.getSeconds() + now.getMilliseconds() / 1000;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setGlobalSeconds(now.getSeconds());
      setSmoothSeconds(now.getSeconds() + now.getMilliseconds() / 1000);
      setTimeInfo(getCurrentTime(timezoneId));
      setTimezoneOffset(getTimezoneOffset(timezoneId));
    }, 50);

    return () => clearInterval(interval);
  }, [timezoneId]);

  const isDayTime = timeInfo.hours >= 6 && timeInfo.hours < 18;
  const dayNightIndicator = isDayTime ? '[DAY]' : '[NIGHT]';

  return {
    timeInfo,
    timezoneOffset,
    isDayTime,
    dayNightIndicator,
    smoothSeconds,
    globalSeconds,
  };
}

export function useClockTimeForTimezone(timezone: Timezone): ClockTimeInfo {
  return useClockTime(timezone.id);
}
