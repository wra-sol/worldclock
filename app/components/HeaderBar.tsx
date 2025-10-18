import type { HeaderBarProps } from '../lib/types';
import { Button } from './ui';

export function HeaderBar({ 
  publicIP, 
  userAgent, 
  ipLoading, 
  clockMode, 
  onClockModeChange 
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
        </div>

        {/* Right Section - Browser Info and Mode Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <span className="text-green-600">BROWSER:</span>
            <span className="text-green-400">
              {userAgent ? userAgent.split(" ")[0] : "Unknown"}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-green-600 text-xs sm:text-sm">MODE:</span>
            <div className="flex space-x-1">
              <Button
                variant={clockMode === "digital" ? "primary" : "secondary"}
                size="sm"
                onClick={() => onClockModeChange("digital")}
                className={clockMode === "digital" ? "terminal-panel-active" : ""}
              >
                [DIGITAL]
              </Button>
              <Button
                variant={clockMode === "analog" ? "primary" : "secondary"}
                size="sm"
                onClick={() => onClockModeChange("analog")}
                className={clockMode === "analog" ? "terminal-panel-active" : ""}
              >
                [ANALOG]
              </Button>
              <Button
                variant={clockMode === "hybrid" ? "primary" : "secondary"}
                size="sm"
                onClick={() => onClockModeChange("hybrid")}
                className={clockMode === "hybrid" ? "terminal-panel-active" : ""}
              >
                [HYBRID]
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
