export interface Timezone {
  id: string;
  name: string;
  city: string;
  country: string;
  offset: string;
}

// Group timezones by UTC offset for better UX and space efficiency
export interface TimezoneGroup {
  offset: string;
  timezones: Timezone[];
}

export const TIMEZONE_GROUPS: TimezoneGroup[] = [
  // UTC-12 (Westernmost)
  { 
    offset: '-12:00', 
    timezones: [
      { id: 'Pacific/Kwajalein', name: 'UTC-12', city: 'Kwajalein', country: 'Marshall Islands', offset: '-12:00' },
      { id: 'Pacific/Wake', name: 'UTC-12', city: 'Wake Island', country: 'USA', offset: '-12:00' }
    ]
  },
  
  // UTC-11
  { 
    offset: '-11:00', 
    timezones: [
      { id: 'Pacific/Midway', name: 'UTC-11', city: 'Midway', country: 'USA', offset: '-11:00' },
      { id: 'Pacific/Niue', name: 'UTC-11', city: 'Alofi', country: 'Niue', offset: '-11:00' }
    ]
  },
  
  // UTC-10
  { 
    offset: '-10:00', 
    timezones: [
      { id: 'Pacific/Honolulu', name: 'Hawaii-Aleutian Time', city: 'Honolulu', country: 'USA', offset: '-10:00' },
      { id: 'Pacific/Tahiti', name: 'Tahiti Time', city: 'Papeete', country: 'French Polynesia', offset: '-10:00' }
    ]
  },
  
  // UTC-9
  { 
    offset: '-09:00', 
    timezones: [
      { id: 'America/Anchorage', name: 'Alaska Time', city: 'Anchorage', country: 'USA', offset: '-09:00' },
      { id: 'Pacific/Gambier', name: 'Gambier Time', city: 'Gambier', country: 'French Polynesia', offset: '-09:00' }
    ]
  },
  
  // UTC-8
  { 
    offset: '-08:00', 
    timezones: [
      { id: 'America/Vancouver', name: 'Pacific Time', city: 'Vancouver', country: 'Canada', offset: '-08:00' },
      { id: 'America/Los_Angeles', name: 'Pacific Time', city: 'Los Angeles', country: 'USA', offset: '-08:00' }
    ]
  },
  
  // UTC-7
  { 
    offset: '-07:00', 
    timezones: [
      { id: 'America/Edmonton', name: 'Mountain Time', city: 'Edmonton', country: 'Canada', offset: '-07:00' },
      { id: 'America/Phoenix', name: 'Mountain Time', city: 'Phoenix', country: 'USA', offset: '-07:00' }
    ]
  },
  
  // UTC-6
  { 
    offset: '-06:00', 
    timezones: [
      { id: 'America/Winnipeg', name: 'Central Time', city: 'Winnipeg', country: 'Canada', offset: '-06:00' },
      { id: 'America/Chicago', name: 'Central Time', city: 'Chicago', country: 'USA', offset: '-06:00' }
    ]
  },
  
  // UTC-5
  { 
    offset: '-05:00', 
    timezones: [
      { id: 'America/Toronto', name: 'Eastern Time', city: 'Toronto', country: 'Canada', offset: '-05:00' },
      { id: 'America/New_York', name: 'Eastern Time', city: 'New York', country: 'USA', offset: '-05:00' }
    ]
  },
  
  // UTC-4
  { 
    offset: '-04:00', 
    timezones: [
      { id: 'America/Halifax', name: 'Atlantic Time', city: 'Halifax', country: 'Canada', offset: '-04:00' },
      { id: 'America/Caracas', name: 'Venezuela Time', city: 'Caracas', country: 'Venezuela', offset: '-04:00' }
    ]
  },
  
  // UTC-3:30
  { 
    offset: '-03:30', 
    timezones: [
      { id: 'America/St_Johns', name: 'Newfoundland Time', city: "St. John's", country: 'Canada', offset: '-03:30' },
      { id: 'America/Goose_Bay', name: 'Newfoundland Time', city: 'Goose Bay', country: 'Canada', offset: '-03:30' }
    ]
  },
  
  // UTC-3
  { 
    offset: '-03:00', 
    timezones: [
      { id: 'America/Sao_Paulo', name: 'Brasília Time', city: 'São Paulo', country: 'Brazil', offset: '-03:00' },
      { id: 'America/Argentina/Buenos_Aires', name: 'Argentina Time', city: 'Buenos Aires', country: 'Argentina', offset: '-03:00' }
    ]
  },
  
  // UTC-2
  { 
    offset: '-02:00', 
    timezones: [
      { id: 'America/Noronha', name: 'Fernando de Noronha Time', city: 'Fernando de Noronha', country: 'Brazil', offset: '-02:00' },
      { id: 'Atlantic/South_Georgia', name: 'South Georgia Time', city: 'Grytviken', country: 'South Georgia', offset: '-02:00' }
    ]
  },
  
  // UTC-1
  { 
    offset: '-01:00', 
    timezones: [
      { id: 'Atlantic/Azores', name: 'Azores Time', city: 'Ponta Delgada', country: 'Portugal', offset: '-01:00' },
      { id: 'Atlantic/Cape_Verde', name: 'Cape Verde Time', city: 'Praia', country: 'Cape Verde', offset: '-01:00' }
    ]
  },
  
  // UTC+0 (Greenwich)
  { 
    offset: '+00:00', 
    timezones: [
      { id: 'Europe/London', name: 'Greenwich Mean Time', city: 'London', country: 'UK', offset: '+00:00' },
      { id: 'Africa/Accra', name: 'Greenwich Mean Time', city: 'Accra', country: 'Ghana', offset: '+00:00' }
    ]
  },
  
  // UTC+1
  { 
    offset: '+01:00', 
    timezones: [
      { id: 'Europe/Paris', name: 'Central European Time', city: 'Paris', country: 'France', offset: '+01:00' },
      { id: 'Europe/Berlin', name: 'Central European Time', city: 'Berlin', country: 'Germany', offset: '+01:00' }
    ]
  },
  
  // UTC+2
  { 
    offset: '+02:00', 
    timezones: [
      { id: 'Europe/Sofia', name: 'Eastern European Time', city: 'Sofia', country: 'Bulgaria', offset: '+02:00' },
      { id: 'Africa/Cairo', name: 'Eastern European Time', city: 'Cairo', country: 'Egypt', offset: '+02:00' }
    ]
  },
  
  // UTC+3
  { 
    offset: '+03:00', 
    timezones: [
      { id: 'Asia/Istanbul', name: 'Turkey Time', city: 'Istanbul', country: 'Turkey', offset: '+03:00' },
      { id: 'Europe/Moscow', name: 'Moscow Time', city: 'Moscow', country: 'Russia', offset: '+03:00' }
    ]
  },
  
  // UTC+4
  { 
    offset: '+04:00', 
    timezones: [
      { id: 'Asia/Tbilisi', name: 'Georgia Time', city: 'Tbilisi', country: 'Georgia', offset: '+04:00' },
      { id: 'Asia/Dubai', name: 'Gulf Standard Time', city: 'Dubai', country: 'UAE', offset: '+04:00' }
    ]
  },
  
  // UTC+4:30
  { 
    offset: '+04:30', 
    timezones: [
      { id: 'Asia/Kabul', name: 'Afghanistan Time', city: 'Kabul', country: 'Afghanistan', offset: '+04:30' },
      { id: 'Asia/Tehran', name: 'Iran Standard Time', city: 'Tehran', country: 'Iran', offset: '+04:30' }
    ]
  },
  
  // UTC+5
  { 
    offset: '+05:00', 
    timezones: [
      { id: 'Asia/Karachi', name: 'Pakistan Standard Time', city: 'Karachi', country: 'Pakistan', offset: '+05:00' },
      { id: 'Asia/Tashkent', name: 'Uzbekistan Time', city: 'Tashkent', country: 'Uzbekistan', offset: '+05:00' }
    ]
  },
  
  // UTC+5:30
  { 
    offset: '+05:30', 
    timezones: [
      { id: 'Asia/Kolkata', name: 'India Standard Time', city: 'Mumbai', country: 'India', offset: '+05:30' },
      { id: 'Asia/Colombo', name: 'Sri Lanka Time', city: 'Colombo', country: 'Sri Lanka', offset: '+05:30' }
    ]
  },
  
  // UTC+6
  { 
    offset: '+06:00', 
    timezones: [
      { id: 'Asia/Dhaka', name: 'Bangladesh Standard Time', city: 'Dhaka', country: 'Bangladesh', offset: '+06:00' },
      { id: 'Asia/Almaty', name: 'Kazakhstan Time', city: 'Almaty', country: 'Kazakhstan', offset: '+06:00' }
    ]
  },
  
  // UTC+6:30
  { 
    offset: '+06:30', 
    timezones: [
      { id: 'Asia/Yangon', name: 'Myanmar Time', city: 'Yangon', country: 'Myanmar', offset: '+06:30' },
      { id: 'Indian/Cocos', name: 'Cocos Islands Time', city: 'West Island', country: 'Cocos Islands', offset: '+06:30' }
    ]
  },
  
  // UTC+7
  { 
    offset: '+07:00', 
    timezones: [
      { id: 'Asia/Bangkok', name: 'Indochina Time', city: 'Bangkok', country: 'Thailand', offset: '+07:00' },
      { id: 'Asia/Jakarta', name: 'Western Indonesia Time', city: 'Jakarta', country: 'Indonesia', offset: '+07:00' }
    ]
  },
  
  // UTC+8
  { 
    offset: '+08:00', 
    timezones: [
      { id: 'Asia/Shanghai', name: 'China Standard Time', city: 'Shanghai', country: 'China', offset: '+08:00' },
      { id: 'Australia/Perth', name: 'Australian Western Time', city: 'Perth', country: 'Australia', offset: '+08:00' }
    ]
  },
  
  // UTC+8:45
  { 
    offset: '+08:45', 
    timezones: [
      { id: 'Australia/Eucla', name: 'Australian Central Western Time', city: 'Eucla', country: 'Australia', offset: '+08:45' }
    ]
  },
  
  // UTC+9
  { 
    offset: '+09:00', 
    timezones: [
      { id: 'Asia/Tokyo', name: 'Japan Standard Time', city: 'Tokyo', country: 'Japan', offset: '+09:00' },
      { id: 'Asia/Seoul', name: 'Korea Standard Time', city: 'Seoul', country: 'South Korea', offset: '+09:00' }
    ]
  },
  
  // UTC+9:30
  { 
    offset: '+09:30', 
    timezones: [
      { id: 'Australia/Adelaide', name: 'Australian Central Time', city: 'Adelaide', country: 'Australia', offset: '+09:30' },
      { id: 'Australia/Darwin', name: 'Australian Central Time', city: 'Darwin', country: 'Australia', offset: '+09:30' }
    ]
  },
  
  // UTC+10
  { 
    offset: '+10:00', 
    timezones: [
      { id: 'Australia/Sydney', name: 'Australian Eastern Time', city: 'Sydney', country: 'Australia', offset: '+10:00' },
      { id: 'Pacific/Port_Moresby', name: 'Papua New Guinea Time', city: 'Port Moresby', country: 'Papua New Guinea', offset: '+10:00' }
    ]
  },
  
  // UTC+10:30
  { 
    offset: '+10:30', 
    timezones: [
      { id: 'Australia/Lord_Howe', name: 'Lord Howe Time', city: 'Lord Howe Island', country: 'Australia', offset: '+10:30' }
    ]
  },
  
  // UTC+11
  { 
    offset: '+11:00', 
    timezones: [
      { id: 'Pacific/Guadalcanal', name: 'Solomon Islands Time', city: 'Honiara', country: 'Solomon Islands', offset: '+11:00' },
      { id: 'Pacific/Noumea', name: 'New Caledonia Time', city: 'Nouméa', country: 'New Caledonia', offset: '+11:00' }
    ]
  },
  
  // UTC+12
  { 
    offset: '+12:00', 
    timezones: [
      { id: 'Pacific/Auckland', name: 'New Zealand Time', city: 'Auckland', country: 'New Zealand', offset: '+12:00' },
      { id: 'Pacific/Fiji', name: 'Fiji Time', city: 'Suva', country: 'Fiji', offset: '+12:00' }
    ]
  },
  
  // UTC+12:45
  { 
    offset: '+12:45', 
    timezones: [
      { id: 'Pacific/Chatham', name: 'Chatham Islands Time', city: 'Waitangi', country: 'New Zealand', offset: '+12:45' }
    ]
  },
  
  // UTC+13
  { 
    offset: '+13:00', 
    timezones: [
      { id: 'Pacific/Tongatapu', name: 'Tonga Time', city: 'Nukuʻalofa', country: 'Tonga', offset: '+13:00' },
      { id: 'Pacific/Apia', name: 'Samoa Time', city: 'Apia', country: 'Samoa', offset: '+13:00' }
    ]
  },
  
  // UTC+14 (Easternmost)
  { 
    offset: '+14:00', 
    timezones: [
      { id: 'Pacific/Kiritimati', name: 'Line Islands Time', city: 'Kiritimati', country: 'Kiribati', offset: '+14:00' },
      { id: 'Pacific/Enderbury', name: 'Phoenix Islands Time', city: 'Enderbury', country: 'Kiribati', offset: '+14:00' }
    ]
  },
];

// Flattened array for backward compatibility
export const TIMEZONES: Timezone[] = TIMEZONE_GROUPS.flatMap(group => group.timezones);

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
  
  // Use consistent locale and options to prevent hydration mismatch
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezoneId,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  
  const dateFormatter = new Intl.DateTimeFormat('en-CA', {
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