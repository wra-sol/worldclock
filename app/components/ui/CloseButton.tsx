import { Button } from './Button';
import type { BaseComponentProps } from '../../lib/types';

interface CloseButtonProps extends BaseComponentProps {
  onClick: (e?: React.MouseEvent) => void;
  'aria-label'?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CloseButton({ 
  onClick, 
  className = '', 
  'aria-label': ariaLabel = 'Close',
  size = 'sm',
  ...props 
}: CloseButtonProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 z-10 hover:bg-green-600 hover:text-black ${className}`}
      {...props}
    >
      ×
    </Button>
  );
}
