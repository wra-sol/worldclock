// Centralized type definitions for World Clock App

export type ClockMode = 'digital' | 'analog' | 'hybrid';

// Re-export Timezone from timezones for convenience
export type { Timezone } from './timezones';

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
}

export interface FooterBarProps extends BaseComponentProps {
  timestamp: string;
}

export interface HighlightedRowProps extends BaseComponentProps {
  highlightedTimezones: Timezone[];
  onRemoveHighlight: (timezoneId: string) => void;
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
