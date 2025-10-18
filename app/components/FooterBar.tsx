import type { FooterBarProps } from '../lib/types';

export function FooterBar({ timestamp }: FooterBarProps) {
  return (
    <div className="terminal-panel border-t-2">
      <div className="flex items-center justify-between p-2">
        <div className="text-green-600 text-xs"></div>
        <div className="text-green-600 text-xs">
          {timestamp}
        </div>
      </div>
    </div>
  );
}
