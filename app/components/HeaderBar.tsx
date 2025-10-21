import type { HeaderBarProps } from "../lib/types";
import { Button, ModeToggle } from "./ui";

export function HeaderBar({
  publicIP,
  userAgent,
  ipLoading,
  clockMode,
  onClockModeChange,
  isFullscreen,
  onToggleFullscreen,
}: HeaderBarProps) {
  return (
    <div className="terminal-panel border-b-2">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-2 gap-2">
        {/* Left Section - Title and Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
          <span className="text-green-400 font-bold">WORLD_CLOCK</span>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="text-green-600">|</span>
            <span className="text-green-600">IP:</span>
            <span className="text-green-400">
              {ipLoading ? "Loading..." : publicIP}
            </span>
            <span className="text-green-600">|</span>
            <span className="text-green-600">LOCAL:</span>
            <span className="text-green-400">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <span className="text-green-600">BROWSER:</span>
            <span className="text-green-400">
              {userAgent ? userAgent.split(" ")[0] : "Unknown"}
            </span>
          </div>
        </div>

        {/* Right Section - Browser Info and Mode Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <ModeToggle
            modes={[
              { value: "digital", label: "DIGITAL" },
              { value: "analog", label: "ANALOG" },
              { value: "hybrid", label: "HYBRID" },
            ]}
            currentMode={clockMode}
            onModeChange={onClockModeChange}
            label="MODE"
            size="sm"
          />

          {/* Fullscreen Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={isFullscreen ? "primary" : "secondary"}
              size="sm"
              onClick={onToggleFullscreen}
              className={isFullscreen ? "terminal-panel-active" : ""}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? "[EXIT FS]" : "[FULLSCREEN]"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
