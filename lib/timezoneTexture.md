# Timezone Texture Generator

This utility generates procedural timezone map textures for the ThreeGlobe component, providing accurate timezone boundaries with UTC offset labels.

## Features

- **Accurate Timezone Boundaries**: Vertical lines every 15 degrees (1 hour intervals)
- **UTC Labels**: Clear timezone offset labels (UTC-12 to UTC+12)
- **Latitude Lines**: Optional horizontal reference lines every 20 degrees
- **City Markers**: Major world cities for geographic reference
- **Customizable Colors**: Terminal-themed green on dark background by default
- **Scalable Resolution**: Configurable canvas size for different quality levels

## Usage

```tsx
import { ThreeGlobe } from './components/ThreeGlobe';

// Use predefined timezone texture preset
<ThreeGlobe timezonePreset="DARK_GREEN" />

// Available presets:
// - DARK_GREEN: Dark background with green lines (terminal style)
// - LIGHT_DARK: Light background with dark lines
// - MINIMAL: Just lines, no labels
// - DETAILED: High resolution with all features
```

## Custom Configuration

```tsx
import { generateTimezoneTexture } from './lib/timezoneTexture';

const { texture, cleanup } = generateTimezoneTexture({
  width: 2048,
  height: 1024,
  backgroundColor: '#0a0a0a',
  lineColor: '#22c55e',
  textColor: '#22c55e',
  showLabels: true,
  showLatLines: true
});

// Use texture in Three.js material
const material = new THREE.MeshPhongMaterial({
  map: texture,
  transparent: true,
  opacity: 0.9
});

// Cleanup when done
cleanup();
```

## Technical Details

- **Projection**: Equirectangular (plate carrée) for sphere mapping
- **Timezone Accuracy**: Based on UTC longitude boundaries
- **Major Cities**: London, New York, Tokyo, Sydney, Dubai
- **Performance**: Canvas-based generation, optimized for Three.js

## Integration with ThreeGlobe

The timezone texture integrates seamlessly with the existing ThreeGlobe component:

1. Set `timezonePreset` prop instead of `textureUrl`
2. Texture is generated procedurally on component mount
3. Automatic cleanup on component unmount
4. Maintains all existing interaction (drag, auto-rotate)

This provides a more accurate and customizable timezone visualization compared to static image textures.