import type { ClockTimeInfo } from '../../lib/hooks/useClockTime';

interface ClockFaceProps {
  timeInfo: ClockTimeInfo['timeInfo'];
  smoothSeconds: number;
  size: number;
  showNumbers?: boolean;
  showSecondHand?: boolean;
  className?: string;
  gradientId?: string;
}

export function ClockFace({
  timeInfo,
  smoothSeconds,
  size,
  showNumbers = true,
  showSecondHand = true,
  className = '',
  gradientId = 'default',
}: ClockFaceProps) {
  const { hours, minutes, seconds } = timeInfo;
  
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const secondDegrees = smoothSeconds * 6;


  return (
    <svg 
      className={`w-full h-full ${className}`} 
      viewBox="0 0 100 100" 
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`clockGradient-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id={`handGradient-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e"/>
          <stop offset="100%" stopColor="#16a34a"/>
        </linearGradient>
      </defs>
      
      {/* Clock face background */}
      <circle 
        cx="50" 
        cy="50" 
        r="48" 
        fill="none" 
        stroke={`url(#clockGradient-${gradientId})`} 
        strokeWidth={size >= 120 ? "2" : "1.5"}
      />
      
      {/* Hour markers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 50 + Math.cos(angle) * 40;
        const y1 = 50 + Math.sin(angle) * 40;
        const x2 = 50 + Math.cos(angle) * 45;
        const y2 = 50 + Math.sin(angle) * 45;
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#22c55e"
            strokeWidth={i % 3 === 0 ? (size >= 120 ? "3" : "2") : (size >= 120 ? "1.5" : "1")}
            opacity={i % 3 === 0 ? "1" : (size >= 120 ? "0.7" : "0.6")}
          />
        );
      })}
      
      {/* Hour numbers */}
      {showNumbers && size >= 120 && [...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = 50 + Math.cos(angle) * 35;
        const y = 50 + Math.sin(angle) * 35;
        const hour = i === 0 ? 12 : i;
        return (
          <text
            key={`hour-${i}`}
            x={x}
            y={y + 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="6"
            fill="#22c55e"
            fontWeight="bold"
            opacity="0.8"
          >
            {hour}
          </text>
        );
      })}
      
      {/* Hour hand */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="25"
        stroke="#22c55e"
        strokeWidth={size >= 120 ? "5" : "3"}
        strokeLinecap="round"
        transform={`rotate(${hourDegrees} 50 50)`}
      />
      
      {/* Minute hand */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        stroke="#16a34a"
        strokeWidth={size >= 120 ? "3" : "2"}
        strokeLinecap="round"
        transform={`rotate(${minuteDegrees} 50 50)`}
      />
      
      {/* Second hand */}
      {showSecondHand && (
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="10"
          stroke="#15803d"
          strokeWidth={size >= 120 ? "2" : "1.5"}
          strokeLinecap="round"
          transform={`rotate(${secondDegrees} 50 50)`}
        />
      )}
      
      {/* Center dot */}
      <circle 
        cx="50" 
        cy="50" 
        r={size >= 120 ? "3" : "2"} 
        fill="#22c55e" 
      />
      <circle 
        cx="50" 
        cy="50" 
        r={size >= 120 ? "1.5" : "1"} 
        fill="#16a34a" 
      />
    </svg>
  );
}
