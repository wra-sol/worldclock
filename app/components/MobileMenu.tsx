import type { MobileMenuProps, Timezone } from '../lib/types';
import { Button } from './ui';

export function MobileMenu({ timezones, highlightedTimezones, onToggleHighlight, onClose }: MobileMenuProps) {
  const highlightedIds = new Set(highlightedTimezones.map(tz => tz.id));
  const isHighlighted = (timezone: Timezone) => highlightedIds.has(timezone.id);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="terminal-panel border-b-2 p-3">
        <div className="flex justify-between items-center">
          <div className="text-green-400 font-bold">TIMEZONE_MANAGER</div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            [X]
          </Button>
        </div>
        <div className="text-green-600 text-xs mt-1">
          SELECTED: {highlightedTimezones.length}/5
        </div>
      </div>

      {/* Timezones List */}
      <div className="flex-1 overflow-y-auto">
        {timezones.map((timezone) => (
          <div
            key={timezone.id}
            className={`terminal-row cursor-pointer ${
              isHighlighted(timezone) ? 'terminal-row-selected' : ''
            }`}
            onClick={() => onToggleHighlight(timezone)}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="text-green-400">{timezone.city}</span>
                <span className="text-green-600 ml-2">{timezone.country}</span>
              </div>
              <div className="text-right">
                <div className="text-green-600 text-xs">
                  {timezone.offset}
                </div>
                {isHighlighted(timezone) && (
                  <div className="text-green-400 text-xs">
                    [SELECTED]
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="terminal-panel border-t-2 p-3">
        <Button
          variant="primary"
          size="md"
          onClick={onClose}
          className="w-full"
        >
          [CLOSE_MENU]
        </Button>
      </div>
    </div>
  );
}