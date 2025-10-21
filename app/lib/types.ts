// Centralized type definitions for World Clock App

export type ClockMode = 'digital' | 'analog' | 'hybrid';

// Import and re-export Timezone from timezones for convenience
import type { Timezone } from './timezones';
export type { Timezone };

export interface TimeInfo {
  hours: number;
  minutes: number;
  seconds: number;
  dayOfWeek: number;
  dayOfMonth: number;
  month: number;
  year: number;
}

export interface PublicIPData {
  publicIP: string;
  userAgent: string;
  isLoading: boolean;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
  ip: string;
  timestamp: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  location: string;
  isLoading: boolean;
  error?: string;
}

export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category?: string;
}

export interface NewsData {
  items: NewsItem[];
  isLoading: boolean;
  error?: string;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export interface PanelProps extends BaseComponentProps {
  variant?: 'default' | 'highlighted' | 'active';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
}

export interface ClockDisplayProps extends BaseComponentProps {
  timezone: Timezone;
  isHighlighted?: boolean;
  clockMode: ClockMode;
  size?: 'sm' | 'md' | 'lg';
}

export interface HeaderBarProps extends BaseComponentProps {
  publicIP: string;
  userAgent: string;
  ipLoading: boolean;
  clockMode: ClockMode;
  onClockModeChange: (mode: ClockMode) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export interface FooterBarProps extends BaseComponentProps {
  weather: WeatherData | null;
  news: NewsData;
}

export interface HighlightedRowProps extends BaseComponentProps {
  highlightedTimezones: Timezone[];
  onRemoveHighlight: (timezoneId: string) => void;
  onReorderTimezones: (timezones: Timezone[]) => void;
  clockMode: ClockMode;
}

export interface TimezoneGridProps extends BaseComponentProps {
  timezones: Timezone[];
  highlightedTimezones: Timezone[];
  onToggleHighlight: (timezone: Timezone) => void;
  clockMode: ClockMode;
}

export interface MobileMenuProps extends BaseComponentProps {
  timezones: Timezone[];
  highlightedTimezones: Timezone[];
  onToggleHighlight: (timezone: Timezone) => void;
  onClose: () => void;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
