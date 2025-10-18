import type { HighlightedRowProps, Timezone } from '../lib/types';
import { ClockDisplay } from './ClockDisplay';
import { Button } from './ui';

export function HighlightedRow({ highlightedTimezones, onRemoveHighlight, clockMode }: HighlightedRowProps) {
  if (highlightedTimezones.length === 0) {
    return (
      <div className="terminal-panel p-2 min-h-24">
        <div className="text-green-600 text-xs">
          SELECT UP TO 5 TIMEZONES FOR PRIORITY DISPLAY
        </div>
      </div>
    );
  }

  const isThreeOrMore = highlightedTimezones.length >= 3;
  
  return (
    <div className={`flex gap-4 ${
      isThreeOrMore 
        ? 'justify-center'
        : 'justify-center'
    }`}>
      {highlightedTimezones.map((timezone) => (
        <div key={timezone.id} className={`relative ${
          isThreeOrMore 
            ? 'flex-1 min-w-0' 
            : 'flex-1 min-w-0'
        } ${
          clockMode === 'analog' ? 'max-w-72' : 
          clockMode === 'hybrid' ? 'max-w-56' : 
          'max-w-64'
        }`}>
          <ClockDisplay
            timezone={timezone}
            isHighlighted={true}
            clockMode={clockMode}
          />
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveHighlight(timezone.id);
            }}
            className="absolute top-2 right-2 w-6 h-6 text-green-600 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 z-10 hover:bg-green-600 hover:text-black"
            aria-label={`Remove ${timezone.city} from highlights`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}