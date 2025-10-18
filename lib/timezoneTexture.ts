import * as THREE from 'three';

/**
 * Utility for generating timezone map textures for the ThreeGlobe component
 * Creates accurate timezone boundaries with UTC offset labels
 */

export interface TimezoneTextureOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  lineColor?: string;
  textColor?: string;
  showLabels?: boolean;
  showLatLines?: boolean;
}

export const generateTimezoneTexture = (options: TimezoneTextureOptions = {}) => {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    throw new Error('generateTimezoneTexture can only be called in a browser environment');
  }

  const {
    width = 2048,
    height = 1024,
    backgroundColor = '#0a0a0a',
    lineColor = '#22c55e',
    textColor = '#22c55e',
    showLabels = true,
    showLatLines = true
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Clear background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Draw timezone boundaries (every 15 degrees = 1 hour)
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = Math.max(1, width / 1000); // Scale line width with canvas size

  // Main timezone lines (UTC offsets from -12 to +12)
  for (let tz = -12; tz <= 12; tz++) {
    const lon = tz * 15; // Convert hours to degrees
    const x = ((lon + 180) / 360) * width;
    
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
    
    // Add timezone labels
    if (showLabels) {
      ctx.fillStyle = textColor;
      ctx.font = `${Math.max(12, width / 150)}px Arial`;
      ctx.textAlign = 'center';
      const label = tz >= 0 ? `UTC+${tz}` : `UTC${tz}`;
      ctx.fillText(label, x, height * 0.1);
    }
  }

  // Draw latitude lines (optional)
  if (showLatLines) {
    ctx.strokeStyle = lineColor + '40'; // Add transparency for lat lines
    ctx.lineWidth = Math.max(1, width / 2000);
    
    for (let lat = -80; lat <= 80; lat += 20) {
      const y = ((90 - lat) / 180) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // Add some major city markers for reference
  if (showLabels) {
    const cities = [
      { name: 'London', lon: 0, lat: 51.5 },
      { name: 'New York', lon: -74, lat: 40.7 },
      { name: 'Tokyo', lon: 139.7, lat: 35.7 },
      { name: 'Sydney', lon: 151.2, lat: -33.9 },
      { name: 'Dubai', lon: 55.3, lat: 25.3 }
    ];

    ctx.fillStyle = textColor;
    ctx.font = `${Math.max(10, width / 200)}px Arial`;
    
    cities.forEach(city => {
      const x = ((city.lon + 180) / 360) * width;
      const y = ((90 - city.lat) / 180) * height;
      
      // Draw a small circle for city location
      ctx.beginPath();
      ctx.arc(x, y, Math.max(2, width / 500), 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw city name
      ctx.fillText(city.name, x, y - Math.max(5, width / 400));
    });
  }

  // Create Three.js texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return {
    texture,
    canvas,
    cleanup: () => {
      texture.dispose();
      // Canvas cleanup is handled by garbage collection
    }
  };
};

/**
 * Predefined timezone texture configurations
 */
export const TIMEZONE_TEXTURES = {
  // Dark theme with green lines (terminal style)
  DARK_GREEN: {
    backgroundColor: '#0a0a0a',
    lineColor: '#22c55e',
    textColor: '#22c55e',
    showLabels: true,
    showLatLines: true
  },
  
  // Light theme with dark lines
  LIGHT_DARK: {
    backgroundColor: '#f0f0f0',
    lineColor: '#1a1a1a',
    textColor: '#1a1a1a',
    showLabels: true,
    showLatLines: true
  },
  
  // Minimal - just lines, no labels
  MINIMAL: {
    backgroundColor: '#0a0a0a',
    lineColor: '#22c55e',
    textColor: '#22c55e',
    showLabels: false,
    showLatLines: false
  },
  
  // Detailed - high resolution with all features
  DETAILED: {
    width: 4096,
    height: 2048,
    backgroundColor: '#0a0a0a',
    lineColor: '#22c55e',
    textColor: '#22c55e',
    showLabels: true,
    showLatLines: true
  }
} as const;

export type TimezoneTexturePreset = keyof typeof TIMEZONE_TEXTURES;