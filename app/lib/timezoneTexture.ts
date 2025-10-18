import * as THREE from 'three';

export type TimezoneTexturePreset = 'DARK_GREEN' | 'BRIGHT_GREEN' | 'BLUE' | 'RED';

export interface TimezoneTextureConfig {
  backgroundColor: string;
  timezoneColor: string;
  continentColor: string;
  lineWidth: number;
  resolution: number;
}

export const TIMEZONE_TEXTURES: Record<TimezoneTexturePreset, TimezoneTextureConfig> = {
  DARK_GREEN: {
    backgroundColor: '#0a0a0a',
    timezoneColor: '#22c55e',
    continentColor: '#22c55e',
    lineWidth: 2,
    resolution: 1024
  },
  BRIGHT_GREEN: {
    backgroundColor: '#000000',
    timezoneColor: '#00ff00',
    continentColor: '#00ff00',
    lineWidth: 1,
    resolution: 1024
  },
  BLUE: {
    backgroundColor: '#0a0a0a',
    timezoneColor: '#3b82f6',
    continentColor: '#3b82f6',
    lineWidth: 2,
    resolution: 1024
  },
  RED: {
    backgroundColor: '#0a0a0a',
    timezoneColor: '#ef4444',
    continentColor: '#ef4444',
    lineWidth: 2,
    resolution: 1024
  }
};

// Real timezone boundaries based on actual political boundaries
interface TimezoneRegion {
  name: string;
  offset: number;
  boundaries: { lon: number; lat: number }[];
}

const TIMEZONE_REGIONS: TimezoneRegion[] = [
  // North America
  {
    name: 'Hawaii',
    offset: -10,
    boundaries: [
      { lon: -180, lat: 18 }, { lon: -180, lat: 22 }, { lon: -154, lat: 22 }, { lon: -154, lat: 18 }
    ]
  },
  {
    name: 'Alaska',
    offset: -9,
    boundaries: [
      { lon: -180, lat: 51 }, { lon: -180, lat: 72 }, { lon: -141, lat: 72 }, { lon: -141, lat: 51 }
    ]
  },
  {
    name: 'Pacific',
    offset: -8,
    boundaries: [
      { lon: -125, lat: 32 }, { lon: -125, lat: 49 }, { lon: -120, lat: 49 }, { lon: -120, lat: 32 }
    ]
  },
  {
    name: 'Mountain',
    offset: -7,
    boundaries: [
      { lon: -120, lat: 32 }, { lon: -120, lat: 49 }, { lon: -105, lat: 49 }, { lon: -105, lat: 32 }
    ]
  },
  {
    name: 'Central',
    offset: -6,
    boundaries: [
      { lon: -105, lat: 25 }, { lon: -105, lat: 49 }, { lon: -90, lat: 49 }, { lon: -90, lat: 25 }
    ]
  },
  {
    name: 'Eastern',
    offset: -5,
    boundaries: [
      { lon: -90, lat: 24 }, { lon: -90, lat: 49 }, { lon: -66, lat: 49 }, { lon: -66, lat: 24 }
    ]
  },
  {
    name: 'Atlantic',
    offset: -4,
    boundaries: [
      { lon: -66, lat: 43 }, { lon: -66, lat: 60 }, { lon: -60, lat: 60 }, { lon: -60, lat: 43 }
    ]
  },
  
  // South America
  {
    name: 'Argentina',
    offset: -3,
    boundaries: [
      { lon: -75, lat: -55 }, { lon: -75, lat: -22 }, { lon: -53, lat: -22 }, { lon: -53, lat: -55 }
    ]
  },
  
  // Europe and Africa
  {
    name: 'GMT',
    offset: 0,
    boundaries: [
      { lon: -15, lat: 35 }, { lon: -15, lat: 60 }, { lon: 0, lat: 60 }, { lon: 0, lat: 35 }
    ]
  },
  {
    name: 'Central European',
    offset: 1,
    boundaries: [
      { lon: 0, lat: 35 }, { lon: 0, lat: 60 }, { lon: 15, lat: 60 }, { lon: 15, lat: 35 }
    ]
  },
  {
    name: 'Eastern European',
    offset: 2,
    boundaries: [
      { lon: 15, lat: 35 }, { lon: 15, lat: 60 }, { lon: 30, lat: 60 }, { lon: 30, lat: 35 }
    ]
  },
  {
    name: 'Moscow',
    offset: 3,
    boundaries: [
      { lon: 30, lat: 35 }, { lon: 30, lat: 60 }, { lon: 45, lat: 60 }, { lon: 45, lat: 35 }
    ]
  },
  
  // Asia
  {
    name: 'Gulf',
    offset: 4,
    boundaries: [
      { lon: 45, lat: 25 }, { lon: 45, lat: 40 }, { lon: 60, lat: 40 }, { lon: 60, lat: 25 }
    ]
  },
  {
    name: 'Pakistan',
    offset: 5,
    boundaries: [
      { lon: 60, lat: 24 }, { lon: 60, lat: 37 }, { lon: 75, lat: 37 }, { lon: 75, lat: 24 }
    ]
  },
  {
    name: 'India',
    offset: 5.5,
    boundaries: [
      { lon: 75, lat: 6 }, { lon: 75, lat: 37 }, { lon: 90, lat: 37 }, { lon: 90, lat: 6 }
    ]
  },
  {
    name: 'Bangladesh',
    offset: 6,
    boundaries: [
      { lon: 90, lat: 20 }, { lon: 90, lat: 27 }, { lon: 105, lat: 27 }, { lon: 105, lat: 20 }
    ]
  },
  {
    name: 'Indochina',
    offset: 7,
    boundaries: [
      { lon: 105, lat: 5 }, { lon: 105, lat: 20 }, { lon: 120, lat: 20 }, { lon: 120, lat: 5 }
    ]
  },
  {
    name: 'China',
    offset: 8,
    boundaries: [
      { lon: 120, lat: 18 }, { lon: 120, lat: 54 }, { lon: 135, lat: 54 }, { lon: 135, lat: 18 }
    ]
  },
  {
    name: 'Japan',
    offset: 9,
    boundaries: [
      { lon: 135, lat: 30 }, { lon: 135, lat: 46 }, { lon: 150, lat: 46 }, { lon: 150, lat: 30 }
    ]
  },
  {
    name: 'Australia Eastern',
    offset: 10,
    boundaries: [
      { lon: 150, lat: -45 }, { lon: 150, lat: -10 }, { lon: 165, lat: -10 }, { lon: 165, lat: -45 }
    ]
  },
  {
    name: 'New Zealand',
    offset: 12,
    boundaries: [
      { lon: 165, lat: -50 }, { lon: 165, lat: -34 }, { lon: 180, lat: -34 }, { lon: 180, lat: -50 }
    ]
  }
];

// Major continent boundaries for reference
const CONTINENT_BOUNDARIES = [
  // North America
  { minLon: -180, maxLon: -60, minLat: 15, maxLat: 85 },
  // South America  
  { minLon: -85, maxLon: -35, minLat: -60, maxLat: 15 },
  // Europe
  { minLon: -25, maxLon: 40, minLat: 35, maxLat: 75 },
  // Africa
  { minLon: -20, maxLon: 55, minLat: -35, maxLat: 35 },
  // Asia
  { minLon: 40, maxLon: 180, minLat: 10, maxLat: 75 },
  // Australia
  { minLon: 110, maxLon: 180, minLat: -50, maxLat: -10 }
];

export function generateTimezoneTexture(config: TimezoneTextureConfig) {
  const canvas = document.createElement('canvas');
  canvas.width = config.resolution;
  canvas.height = config.resolution / 2; // Standard world map aspect ratio
  const ctx = canvas.getContext('2d')!;
  
  // Fill background
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Convert hex colors to RGB
  const bgColor = hexToRgb(config.backgroundColor);
  const timezoneColor = hexToRgb(config.timezoneColor);
  const continentColor = hexToRgb(config.continentColor);
  
  // Create image data for pixel manipulation
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  
  // Draw timezone boundaries
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const longitude = (x / canvas.width) * 360 - 180;
      const latitude = 90 - (y / canvas.height) * 180;
      
      // Check if this pixel is on land (simplified land detection)
      const isLand = isLandPixel(longitude, latitude);
      
      if (isLand) {
        // Find current timezone
        const currentTimezone = getTimezoneForLocation(longitude, latitude);
        
        // Check for timezone boundaries
        const isTimezoneBoundary = isTimezoneBoundaryPixel(longitude, latitude, currentTimezone);
        
        if (isTimezoneBoundary) {
          setPixel(data, x, y, timezoneColor, canvas.width);
        } else if (currentTimezone) {
          setPixel(data, x, y, continentColor, canvas.width);
        }
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  // Create Three.js texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  
  return {
    texture,
    cleanup: () => {
      texture.dispose();
    }
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function setPixel(data: Uint8ClampedArray, x: number, y: number, color: { r: number; g: number; b: number }, width: number) {
  const index = (y * width + x) * 4;
  data[index] = color.r;     // Red
  data[index + 1] = color.g; // Green
  data[index + 2] = color.b; // Blue
  data[index + 3] = 255;     // Alpha
}

function isLandPixel(longitude: number, latitude: number): boolean {
  // Simplified land detection based on major continents
  for (const continent of CONTINENT_BOUNDARIES) {
    if (longitude >= continent.minLon && longitude <= continent.maxLon &&
        latitude >= continent.minLat && latitude <= continent.maxLat) {
      return true;
    }
  }
  return false;
}

function getTimezoneForLocation(longitude: number, latitude: number): TimezoneRegion | null {
  for (const region of TIMEZONE_REGIONS) {
    if (isPointInPolygon(longitude, latitude, region.boundaries)) {
      return region;
    }
  }
  return null;
}

function isPointInPolygon(lon: number, lat: number, polygon: { lon: number; lat: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lon;
    const yi = polygon[i].lat;
    const xj = polygon[j].lon;
    const yj = polygon[j].lat;
    
    if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

function isTimezoneBoundaryPixel(longitude: number, latitude: number, currentTimezone: TimezoneRegion | null): boolean {
  if (!currentTimezone) return false;
  
  // Check if we're near a timezone boundary by sampling nearby points
  const sampleDistance = 0.5; // degrees
  const samples = [
    { lon: longitude - sampleDistance, lat: latitude },
    { lon: longitude + sampleDistance, lat: latitude },
    { lon: longitude, lat: latitude - sampleDistance },
    { lon: longitude, lat: latitude + sampleDistance }
  ];
  
  for (const sample of samples) {
    const sampleTimezone = getTimezoneForLocation(sample.lon, sample.lat);
    if (sampleTimezone && sampleTimezone.offset !== currentTimezone.offset) {
      return true;
    }
  }
  
  return false;
}
