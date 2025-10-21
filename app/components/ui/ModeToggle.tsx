import { Button } from './Button';
import type { BaseComponentProps, ClockMode } from '../../lib/types';

interface ModeToggleProps extends BaseComponentProps {
  modes: Array<{
    value: ClockMode;
    label: string;
  }>;
  currentMode: ClockMode;
  onModeChange: (mode: ClockMode) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ModeToggle({
  modes,
  currentMode,
  onModeChange,
  label,
  size = 'sm',
  className = '',
  ...props
}: ModeToggleProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`} {...props}>
      {label && (
        <span className="text-green-600 text-xs sm:text-sm">
          {label}:
        </span>
      )}
      <div className="flex space-x-1">
        {modes.map((mode) => (
          <Button
            key={mode.value}
            variant={currentMode === mode.value ? "primary" : "secondary"}
            size={size}
            onClick={() => onModeChange(mode.value)}
            className={currentMode === mode.value ? "terminal-panel-active" : ""}
          >
            [{mode.label}]
          </Button>
        ))}
      </div>
    </div>
  );
}
