export interface Timezone {
  id: string;
  name: string;
  city: string;
  country: string;
  offset: string;
}

export const TIMEZONES: Timezone[] = [
  // UTC-12 to UTC-11
  { id: 'Pacific/Kwajalein', name: 'UTC-12', city: 'Kwajalein', country: 'Marshall Islands', offset: '-12:00' },
  { id: 'Pacific/Midway', name: 'UTC-11', city: 'Midway', country: 'USA', offset: '-11:00' },
  
  // UTC-10
  { id: 'Pacific/Honolulu', name: 'Hawaii-Aleutian Time', city: 'Honolulu', country: 'USA', offset: '-10:00' },
  
  // UTC-9
  { id: 'America/Anchorage', name: 'Alaska Time', city: 'Anchorage', country: 'USA', offset: '-09:00' },
  
  // UTC-8
  { id: 'America/Vancouver', name: 'Pacific Time', city: 'Vancouver', country: 'Canada', offset: '-08:00' },
  { id: 'America/Los_Angeles', name: 'Pacific Time', city: 'Los Angeles', country: 'USA', offset: '-08:00' },
  
  // UTC-7
  { id: 'America/Edmonton', name: 'Mountain Time', city: 'Edmonton', country: 'Canada', offset: '-07:00' },
  // UTC-6
  { id: 'America/Winnipeg', name: 'Central Time', city: 'Winnipeg', country: 'Canada', offset: '-06:00' },
  { id: 'America/Chicago', name: 'Central Time', city: 'Chicago', country: 'USA', offset: '-06:00' },
  // UTC-5
  { id: 'America/Toronto', name: 'Eastern Time', city: 'Toronto', country: 'Canada', offset: '-05:00' },
  { id: 'America/New_York', name: 'Eastern Time', city: 'New York', country: 'USA', offset: '-05:00' },
  // UTC-4
  { id: 'America/Halifax', name: 'Atlantic Time', city: 'Halifax', country: 'Canada', offset: '-04:00' },
  // UTC-3:30
  { id: 'America/St_Johns', name: 'Newfoundland Time', city: "St. John's", country: 'Canada', offset: '-03:30' },
  
  // UTC-3
  { id: 'America/Sao_Paulo', name: 'Brasília Time', city: 'São Paulo', country: 'Brazil', offset: '-03:00' },
  // UTC-2
  { id: 'America/Noronha', name: 'Fernando de Noronha Time', city: 'Fernando de Noronha', country: 'Brazil', offset: '-02:00' },
  // UTC-1
  { id: 'Atlantic/Azores', name: 'Azores Time', city: 'Ponta Delgada', country: 'Portugal', offset: '-01:00' },
  
  // UTC+0
  { id: 'Europe/London', name: 'Greenwich Mean Time', city: 'London', country: 'UK', offset: '+00:00' },
  
  // UTC+1
  { id: 'Europe/Paris', name: 'Central European Time', city: 'Paris', country: 'France', offset: '+01:00' },
  // UTC+2
  { id: 'Europe/Sofia', name: 'Eastern European Time', city: 'Sofia', country: 'Bulgaria', offset: '+02:00' },
  // UTC+3
  { id: 'Asia/Istanbul', name: 'Turkey Time', city: 'Istanbul', country: 'Turkey', offset: '+03:00' },
  // UTC+4
  { id: 'Asia/Tbilisi', name: 'Georgia Time', city: 'Tbilisi', country: 'Georgia', offset: '+04:00' },
  // UTC+4:30
  { id: 'Asia/Kabul', name: 'Afghanistan Time', city: 'Kabul', country: 'Afghanistan', offset: '+04:30' },
  // UTC+5
  { id: 'Asia/Karachi', name: 'Pakistan Standard Time', city: 'Karachi', country: 'Pakistan', offset: '+05:00' },
  // UTC+5:30
  { id: 'Asia/Kolkata', name: 'India Standard Time', city: 'Mumbai', country: 'India', offset: '+05:30' },
  // UTC+6
  { id: 'Asia/Dhaka', name: 'Bangladesh Standard Time', city: 'Dhaka', country: 'Bangladesh', offset: '+06:00' },
  // UTC+6:30
  { id: 'Asia/Yangon', name: 'Myanmar Time', city: 'Yangon', country: 'Myanmar', offset: '+06:30' },
  // UTC+7
  { id: 'Asia/Bangkok', name: 'Indochina Time', city: 'Bangkok', country: 'Thailand', offset: '+07:00' },
  // UTC+8
  { id: 'Asia/Shanghai', name: 'China Standard Time', city: 'Shanghai', country: 'China', offset: '+08:00' },,
  { id: 'Australia/Perth', name: 'Australian Western Time', city: 'Perth', country: 'Australia', offset: '+08:00' },
  // UTC+8:45
  { id: 'Australia/Eucla', name: 'Australian Central Western Time', city: 'Eucla', country: 'Australia', offset: '+08:45' },
  // UTC+9
  { id: 'Asia/Tokyo', name: 'Japan Standard Time', city: 'Tokyo', country: 'Japan', offset: '+09:00' },
  // UTC+9:30
  { id: 'Australia/Adelaide', name: 'Australian Central Time', city: 'Adelaide', country: 'Australia', offset: '+09:30' },
  // UTC+10
  { id: 'Australia/Sydney', name: 'Australian Eastern Time', city: 'Sydney', country: 'Australia', offset: '+10:00' },
  // UTC+10:30
  { id: 'Australia/Lord_Howe', name: 'Lord Howe Time', city: 'Lord Howe Island', country: 'Australia', offset: '+10:30' },
  // UTC+11
  { id: 'Pacific/Guadalcanal', name: 'Solomon Islands Time', city: 'Honiara', country: 'Solomon Islands', offset: '+11:00' },
  // UTC+12
  { id: 'Pacific/Auckland', name: 'New Zealand Time', city: 'Auckland', country: 'New Zealand', offset: '+12:00' },
  // UTC+12:45
  { id: 'Pacific/Chatham', name: 'Chatham Islands Time', city: 'Waitangi', country: 'New Zealand', offset: '+12:45' },
  // UTC+13
  { id: 'Pacific/Tongatapu', name: 'Tonga Time', city: 'Nukuʻalofa', country: 'Tonga', offset: '+13:00' },
  // UTC+14
  { id: 'Pacific/Kiritimati', name: 'Line Islands Time', city: 'Kiritimati', country: 'Kiribati', offset: '+14:00' },
];

export interface TimeInfo {
  time: string;
  date: string;
  hours: number;
  minutes: number;
  seconds: number;
  timezone: string;
}

export function getCurrentTime(timezoneId: string): TimeInfo {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneId,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneId,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  
  const timeParts = formatter.formatToParts(now);
  const dateParts = dateFormatter.formatToParts(now);
  
  const hours = parseInt(timeParts.find(part => part.type === 'hour')?.value || '0');
  const minutes = parseInt(timeParts.find(part => part.type === 'minute')?.value || '0');
  const seconds = parseInt(timeParts.find(part => part.type === 'second')?.value || '0');
  
  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const date = dateParts.map(part => part.value).join(' ');
  
  return {
    time,
    date,
    hours,
    minutes,
    seconds,
    timezone: timezoneId,
  };
}

export function getTimezoneOffset(timezoneId: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneId,
    timeZoneName: 'short',
  });
  
  const parts = formatter.formatToParts(now);
  const timeZoneName = parts.find(part => part.type === 'timeZoneName')?.value || '';
  
  // Extract offset from timezone name or calculate it
  const offset = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneId,
    timeZoneName: 'longOffset',
  }).formatToParts(now).find(part => part.type === 'timeZoneName')?.value || '';
  
  return offset;
}