import type { TimezoneGridProps, Timezone } from "../lib/types";
import { TIMEZONE_GROUPS } from "../lib/timezones";
import { MiniClock } from "./clock/MiniClock";
import { useClockTime } from "../lib/hooks/useClockTime";

export function TimezoneGrid({
  timezones,
  highlightedTimezones,
  onToggleHighlight,
  clockMode = "digital",
}: TimezoneGridProps) {
  const highlightedIds = new Set(highlightedTimezones.map((tz) => tz.id));
  const isHighlighted = (timezone: Timezone) => highlightedIds.has(timezone.id);

  return (
    <div className="terminal-panel p-2 h-full relative overflow-hidden">
      {/* World Map Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url(/World_map_green.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none"></div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="text-green-600 text-xs mb-2 uppercase tracking-wider font-medium flex items-center gap-2 flex-shrink-0">
          <span>All Timezones</span>
          <div className="flex-1 h-px bg-gradient-to-r from-green-600/50 via-green-500/30 to-green-600/50"></div>
          <span className="text-green-500/70 text-xs">UTC-12 → UTC+14</span>
        </div>
        <div className="flex gap-1 flex-1 overflow-x-auto">
          {TIMEZONE_GROUPS.map((group) => (
            <div
              key={group.offset}
              className="flex flex-col min-w-0 flex-shrink-0 h-full"
              style={{ width: "80px" }}
            >
              {/* UTC Offset Header */}
              <div className="text-center text-xs text-green-500/90 font-mono py-1 border-b border-green-600/40 bg-green-900/10 rounded-t flex-shrink-0">
                {group.offset}
              </div>

              {/* Timezones in this group */}
              <div className="flex-1 flex flex-col">
                {group.timezones.map((timezone) => {
                  const clockTimeInfo = useClockTime(timezone.id);

                  return (
                    <div
                      key={timezone.id}
                      className={`terminal-row cursor-pointer p-1 transition-all duration-200 flex-1 flex flex-col justify-center border-l-1 border-r-1 border-green-600/60 ${
                        isHighlighted(timezone)
                          ? "terminal-row-selected bg-green-900/40 border border-green-400"
                          : "hover:bg-green-900/20 border border-transparent"
                      }`}
                      onClick={() => onToggleHighlight(timezone)}
                    >
                      <MiniClock
                        timezone={timezone}
                        clockTimeInfo={clockTimeInfo}
                        clockMode={clockMode}
                        size="sm"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
