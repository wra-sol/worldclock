// Design Tokens for World Clock App
// Centralized design system for consistent styling

export const colors = {
  // Primary green palette
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Primary green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Neutral grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Terminal specific colors
  terminal: {
    bg: '#000000',
    panel: '#0a0a0a',
    panelHover: '#111111',
    panelActive: '#166534',
    border: '#22c55e',
    borderHover: '#16a34a',
    text: '#22c55e',
    textSecondary: '#16a34a',
    textMuted: '#15803d',
    textActive: '#dcfce7',
  },
  
  // Status colors
  status: {
    day: '#22c55e',
    night: '#1e40af',
    loading: '#f59e0b',
    error: '#ef4444',
  }
} as const;

export const fonts = {
  mono: '"JetBrains Mono", "Courier New", "Lucida Console", Monaco, monospace',
  sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const;

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
  '4xl': '2.5rem', // 40px
  '5xl': '3rem',   // 48px
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.25rem',    // 4px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  terminal: 'inset 0 1px 0 rgba(34, 197, 94, 0.2), 0 2px 10px rgba(0, 0, 0, 0.5)',
  terminalHover: 'inset 0 1px 0 rgba(34, 197, 94, 0.3), 0 4px 20px rgba(34, 197, 94, 0.2)',
  terminalActive: 'inset 0 1px 0 rgba(34, 197, 94, 0.3), 0 0 10px rgba(34, 197, 94, 0.4)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  dropdown: 10,
  modal: 50,
  popover: 20,
  tooltip: 30,
} as const;

export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// CSS Custom Properties for runtime theming
export const cssVariables = {
  '--color-terminal-bg': colors.terminal.bg,
  '--color-terminal-panel': colors.terminal.panel,
  '--color-terminal-panel-hover': colors.terminal.panelHover,
  '--color-terminal-panel-active': colors.terminal.panelActive,
  '--color-terminal-border': colors.terminal.border,
  '--color-terminal-border-hover': colors.terminal.borderHover,
  '--color-terminal-text': colors.terminal.text,
  '--color-terminal-text-secondary': colors.terminal.textSecondary,
  '--color-terminal-text-muted': colors.terminal.textMuted,
  '--color-terminal-text-active': colors.terminal.textActive,
  '--font-mono': fonts.mono,
  '--spacing-xs': spacing.xs,
  '--spacing-sm': spacing.sm,
  '--spacing-md': spacing.md,
  '--spacing-lg': spacing.lg,
  '--spacing-xl': spacing.xl,
  '--spacing-2xl': spacing['2xl'],
  '--spacing-3xl': spacing['3xl'],
  '--spacing-4xl': spacing['4xl'],
  '--spacing-5xl': spacing['5xl'],
} as const;
