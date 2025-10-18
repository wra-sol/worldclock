import { forwardRef } from 'react';
import type { ButtonProps } from '../../lib/types';
import { colors, spacing, borderRadius, animations } from '../../lib/design-tokens';

const buttonVariants = {
  primary: {
    background: colors.terminal.panel,
    border: `1px solid ${colors.terminal.border}`,
    color: colors.terminal.text,
    hover: {
      background: colors.terminal.panelHover,
    },
    active: {
      background: colors.terminal.panelActive,
    },
  },
  secondary: {
    background: 'transparent',
    border: `1px solid ${colors.terminal.border}`,
    color: colors.terminal.textSecondary,
    hover: {
      background: colors.terminal.panel,
    },
    active: {
      background: colors.terminal.panelHover,
    },
  },
  ghost: {
    background: 'transparent',
    border: 'none',
    color: colors.terminal.text,
    hover: {
      background: colors.terminal.panel,
    },
    active: {
      background: colors.terminal.panelHover,
    },
  },
  danger: {
    background: colors.terminal.panel,
    border: `1px solid ${colors.status.error}`,
    color: colors.status.error,
    hover: {
      background: colors.terminal.panelHover,
    },
    active: {
      background: colors.status.error,
      color: colors.terminal.textActive,
    },
  },
} as const;

const buttonSizes = {
  sm: {
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: '0.75rem',
  },
  md: {
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: '0.875rem',
  },
  lg: {
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: '1rem',
  },
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    className = '', 
    children, 
    onClick,
    type = 'button',
    'aria-label': ariaLabel,
    ...props 
  }, ref) => {
    const variantStyles = buttonVariants[variant];
    const sizeStyles = buttonSizes[size];

    const baseStyles = {
      fontFamily: 'var(--font-mono)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      textTransform: 'uppercase' as const,
      borderRadius: borderRadius.md,
      transition: `all ${animations.duration.fast} ${animations.easing.ease}`,
      opacity: disabled ? 0.5 : 1,
      ...sizeStyles,
      ...variantStyles,
    };

    const hoverStyles = disabled ? {} : variantStyles.hover;
    const activeStyles = disabled ? {} : variantStyles.active;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        style={baseStyles}
        onMouseEnter={(e) => {
          if (!disabled) {
            Object.assign(e.currentTarget.style, hoverStyles);
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            Object.assign(e.currentTarget.style, baseStyles);
          }
        }}
        onMouseDown={(e) => {
          if (!disabled) {
            Object.assign(e.currentTarget.style, activeStyles);
          }
        }}
        onMouseUp={(e) => {
          if (!disabled) {
            Object.assign(e.currentTarget.style, baseStyles);
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
