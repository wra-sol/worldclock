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
import { ThreeGlobe } from "./ThreeGlobe";

export function WorldClock() {
  const [highlightedTimezones, setHighlightedTimezones] = useState<Timezone[]>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("highlightedTimezones");
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    }
  );
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [clockMode, setClockMode] = useState<ClockMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("clockMode");
      return (saved as ClockMode) || "digital";
    }
    return "digital";
  });
  const { publicIP, userAgent, isLoading: ipLoading } = usePublicIP();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "highlightedTimezones",
        JSON.stringify(highlightedTimezones)
      );
    }
  }, [highlightedTimezones]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("clockMode", clockMode);
    }
  }, [clockMode]);

  const handleRemoveHighlight = (timezoneId: string) => {
    setHighlightedTimezones((prev) =>
      prev.filter((tz) => tz.id !== timezoneId)
    );
  };

  const handleGlobeClick = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    }
  };

  return (
    <div className="flex flex-col terminal-grid min-h-screen">
      {/* Header Bar */}
      <HeaderBar
        publicIP={publicIP}
        userAgent={userAgent || ""}
        ipLoading={ipLoading}
        clockMode={clockMode}
        onClockModeChange={setClockMode}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Priority Timezones - Full Width */}
        <div className="border-b border-green-600 p-2 sm:p-4 mb-2 sm:mb-4">
          <div className="text-green-600 text-xs mb-2 sm:mb-3 uppercase tracking-wider">
            Priority Zones
          </div>

          <HighlightedRow
            highlightedTimezones={highlightedTimezones}
            onRemoveHighlight={handleRemoveHighlight}
            clockMode={clockMode}
          />
        </div>

        {/* Below Section - Global Monitor + Timezones */}
        <div className="flex-1 flex flex-col xl:flex-row gap-2 sm:gap-4 px-2 sm:px-4">
          {/* Left Panel - Globe */}
{/*           <div className="xl:w-1/3 border-r-0 xl:border-r border-green-600 px-2 sm:px-4">
            <div className="terminal-panel p-2 h-full overflow-y-auto">
              <div className="text-green-600 text-xs mb-2 uppercase">
                Global Monitor
              </div>
              <div
                onClick={handleGlobeClick}
                className={isMobile ? "cursor-pointer" : ""}
              >
                <ThreeGlobe timezonePreset="DARK_GREEN" />
                {isMobile && (
                  <div className="text-center mt-2">
                    <div className="text-green-600 text-xs">
                      {showMobileMenu ? "[CLOSE MENU]" : "[TAP TO MANAGE]"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> */}

          {/* All Timezones */}
          <div className="flex-1 overflow-y-auto pb-2 sm:pb-4">

              <TimezoneGrid
                timezones={TIMEZONES}
                highlightedTimezones={highlightedTimezones}
                onToggleHighlight={handleToggleHighlight}
                clockMode={clockMode}
              />
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <FooterBar timestamp={new Date().toISOString()} />

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
