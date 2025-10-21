import { useState, useEffect } from "react";
import type { ClockMode } from "../lib/types";
import type { Timezone } from "../lib/timezones";
import { TIMEZONES } from "../lib/timezones";
import { HighlightedRow } from "./HighlightedRow";
import { TimezoneGrid } from "./TimezoneGrid";
import { MobileMenu } from "./MobileMenu";
import { HeaderBar } from "./HeaderBar";
import { FooterBar } from "./FooterBar";
import { usePublicIP } from "../lib/usePublicIP";
import { useLocalStorage } from "../lib/hooks/useLocalStorage";
import { useFullscreen } from "../lib/hooks/useFullscreen";
import { useResponsive } from "../lib/hooks/useResponsive";
import { useWeather } from "../lib/hooks/useWeather";
import { useNews } from "../lib/hooks/useNews";
import { ThreeGlobe } from "./ThreeGlobe";

export function WorldClock() {
  const [highlightedTimezones, setHighlightedTimezones] = useLocalStorage<Timezone[]>("highlightedTimezones", []);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [clockMode, setClockMode] = useLocalStorage<ClockMode>("clockMode", "digital");
  const [isHydrated, setIsHydrated] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isMobile } = useResponsive();
const { publicIP, userAgent, isLoading: ipLoading } = usePublicIP();
  const weather = useWeather(publicIP);
  const news = useNews();

  // Prevent hydration mismatch by only rendering after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);


  const handleToggleHighlight = (timezone: Timezone) => {
    setHighlightedTimezones((prev) => {
      const isHighlighted = prev.some((tz) => tz.id === timezone.id);

      if (isHighlighted) {
        return prev.filter((tz) => tz.id !== timezone.id);
      } else {
        if (prev.length >= 5) {
          return prev;
        }
        return [...prev, timezone];
      }
    });
  };


  const handleRemoveHighlight = (timezoneId: string) => {
    setHighlightedTimezones((prev) =>
      prev.filter((tz) => tz.id !== timezoneId)
    );
  };

  const handleReorderTimezones = (reorderedTimezones: Timezone[]) => {
    setHighlightedTimezones(reorderedTimezones);
  };

  const handleGlobeClick = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    }
  };


  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="flex flex-col terminal-grid min-h-screen">
        <div className="flex items-center justify-center h-screen">
          <div className="text-green-600 text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col terminal-grid h-screen ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      {/* Fixed Header Bar */}
      <div className="flex-shrink-0">
        <HeaderBar
          publicIP={publicIP}
          userAgent={userAgent || ""}
          ipLoading={ipLoading}
          clockMode={clockMode}
          onClockModeChange={setClockMode}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>

      {/* Fixed Priority Timezones */}
      <div className="flex-shrink-0 border-b-2 border-green-600/30 bg-green-900/5 p-2 sm:p-4">
        <div className="text-green-400 text-xs mb-2 sm:mb-3 uppercase tracking-widest font-semibold flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          Priority Timezones
        </div>
        <HighlightedRow
          highlightedTimezones={highlightedTimezones}
          onRemoveHighlight={handleRemoveHighlight}
          onReorderTimezones={handleReorderTimezones}
          clockMode={clockMode}
        />
      </div>

      {/* All Timezones Container - Full Height */}
      <div className="flex-1 overflow-hidden flex flex-col px-2 sm:px-4 pb-20">
        <div className="flex-1 flex">
          <TimezoneGrid
            timezones={TIMEZONES}
            highlightedTimezones={highlightedTimezones}
            onToggleHighlight={handleToggleHighlight}
            clockMode={clockMode}
          />
        </div>
      </div>

      {/* Fixed Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <FooterBar news={news} weather={weather}/>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && showMobileMenu && (
        <MobileMenu
          timezones={TIMEZONES}
          highlightedTimezones={highlightedTimezones}
          onToggleHighlight={handleToggleHighlight}
          onClose={() => setShowMobileMenu(false)}
        />
      )}
    </div>
  );
}
