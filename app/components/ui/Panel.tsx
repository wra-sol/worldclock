import { forwardRef } from 'react';
import type { PanelProps } from '../../lib/types';
import { colors, spacing, borderRadius, shadows } from '../../lib/design-tokens';

const panelVariants = {
  default: {
    background: colors.terminal.panel,
    border: `1px solid ${colors.terminal.border}`,
    color: colors.terminal.text,
  },
  highlighted: {
    background: colors.terminal.panelHover,
    border: `1px solid ${colors.terminal.border}`,
    color: colors.terminal.text,
  },
  active: {
    background: colors.terminal.panelActive,
    border: `2px solid ${colors.terminal.border}`,
    color: colors.terminal.textActive,
    boxShadow: shadows.terminalActive,
  },
} as const;

const panelPadding = {
  none: '0',
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
} as const;

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ 
    variant = 'default', 
    padding = 'md', 
    border = true, 
    hover = false, 
    className = '', 
    children, 
    ...props 
  }, ref) => {
    const variantStyles = panelVariants[variant];
    const paddingValue = panelPadding[padding];

    const baseStyles = {
      borderRadius: borderRadius.md,
      transition: hover ? 'all 0.3s ease' : 'none',
      ...variantStyles,
      padding: paddingValue,
    };

    const hoverStyles = hover ? {
      background: colors.terminal.panelHover,
      boxShadow: shadows.terminalHover,
      borderColor: colors.terminal.borderHover,
    } : {};

    return (
      <div
        ref={ref}
        className={className}
        style={baseStyles}
        onMouseEnter={(e) => {
          if (hover) {
            Object.assign(e.currentTarget.style, hoverStyles);
          }
        }}
        onMouseLeave={(e) => {
          if (hover) {
            Object.assign(e.currentTarget.style, baseStyles);
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Panel.displayName = 'Panel';
