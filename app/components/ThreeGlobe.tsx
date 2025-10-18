import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { generateTimezoneTexture, TIMEZONE_TEXTURES, type TimezoneTexturePreset } from '../../lib/timezoneTexture';

interface ThreeGlobeProps {
  width?: number;
  height?: number;
  radius?: number;
  textureUrl?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  timezonePreset?: TimezoneTexturePreset;
}

export const ThreeGlobe: React.FC<ThreeGlobeProps> = ({
  width,
  height,
  radius = 6,
  textureUrl,
  timezonePreset = 'DARK_GREEN',
  autoRotate = true,
  rotationSpeed = 0.001,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(null);

  // Generate timezone texture if preset is specified (only in browser)
  const timezoneTextureData = useMemo(() => {
    if (timezonePreset && !textureUrl && typeof document !== 'undefined') {
      try {
        return generateTimezoneTexture(TIMEZONE_TEXTURES[timezonePreset]);
      } catch (error) {
        console.warn('Failed to generate timezone texture:', error);
        return null;
      }
    }
    return null;
  }, [timezonePreset, textureUrl]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get container dimensions
    const container = containerRef.current;
    const containerWidth = width || container.clientWidth;
    const containerHeight = height || container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.z = 14;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create globe
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    
    let material: THREE.MeshPhongMaterial | THREE.ShaderMaterial;
    
    if (timezoneTextureData) {
      // Use generated timezone texture
      material = new THREE.MeshPhongMaterial({
        map: timezoneTextureData.texture,
        transparent: true,
        opacity: 1.0,
        shininess: 30,
        specular: 0x222222,
        emissive: 0x000000,
      });
    } else if (textureUrl) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(textureUrl);
      
      // Create custom shader material for green outline effect
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
      
      const fragmentShader = `
        uniform sampler2D map;
        uniform float time;
        varying vec2 vUv;
        
        // Real timezone boundaries (approximate UTC offsets)
        float getTimezoneOffset(float longitude) {
          // Convert longitude to approximate timezone offset
          float offset = longitude * 12.0 / 3.14159; // Scale to -12 to +12
          
          // Real timezone boundaries (simplified)
          if (longitude < -2.79) { // West of -160° (Hawaii)
            return -10.0;
          } else if (longitude < -2.44) { // -140° (Alaska)
            return -9.0;
          } else if (longitude < -2.09) { // -120° (Pacific)
            return -8.0;
          } else if (longitude < -1.75) { // -100° (Mountain)
            return -7.0;
          } else if (longitude < -1.40) { // -80° (Central)
            return -6.0;
          } else if (longitude < -1.05) { // -60° (Eastern)
            return -5.0;
          } else if (longitude < -0.70) { // -40° (Atlantic)
            return -4.0;
          } else if (longitude < -0.35) { // -20° (Azores)
            return -1.0;
          } else if (longitude < 0.0) { // 0° (GMT)
            return 0.0;
          } else if (longitude < 0.35) { // 20° (Central Europe)
            return 1.0;
          } else if (longitude < 0.70) { // 40° (Eastern Europe)
            return 2.0;
          } else if (longitude < 1.05) { // 60° (Middle East)
            return 3.0;
          } else if (longitude < 1.40) { // 80° (India)
            return 5.5;
          } else if (longitude < 1.75) { // 100° (China)
            return 8.0;
          } else if (longitude < 2.09) { // 120° (Japan)
            return 9.0;
          } else if (longitude < 2.44) { // 140° (Australia)
            return 10.0;
          } else if (longitude < 2.79) { // 160° (New Zealand)
            return 12.0;
          } else { // 180° (International Date Line)
            return 12.0;
          }
        }
        
        void main() {
          vec4 texColor = texture2D(map, vUv);
          
          // Convert to grayscale
          float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
          
          // Create outline effect by detecting edges
          float edge = 0.0;
          float step = 1.0 / 512.0;
          
          // Sample surrounding pixels for edge detection
          float tl = dot(texture2D(map, vUv + vec2(-step, -step)).rgb, vec3(0.299, 0.587, 0.114));
          float tm = dot(texture2D(map, vUv + vec2(0.0, -step)).rgb, vec3(0.299, 0.587, 0.114));
          float tr = dot(texture2D(map, vUv + vec2(step, -step)).rgb, vec3(0.299, 0.587, 0.114));
          float ml = dot(texture2D(map, vUv + vec2(-step, 0.0)).rgb, vec3(0.299, 0.587, 0.114));
          float mr = dot(texture2D(map, vUv + vec2(step, 0.0)).rgb, vec3(0.299, 0.587, 0.114));
          float bl = dot(texture2D(map, vUv + vec2(-step, step)).rgb, vec3(0.299, 0.587, 0.114));
          float bm = dot(texture2D(map, vUv + vec2(0.0, step)).rgb, vec3(0.299, 0.587, 0.114));
          float br = dot(texture2D(map, vUv + vec2(step, step)).rgb, vec3(0.299, 0.587, 0.114));
          
          // Sobel edge detection
          float gx = tl + 2.0*ml + bl - tr - 2.0*mr - br;
          float gy = tl + 2.0*tm + tr - bl - 2.0*bm - br;
          edge = sqrt(gx*gx + gy*gy);
          
          // Threshold and smooth the edge
          edge = smoothstep(0.1, 0.3, edge);
          
          // Create real timezone boundaries
          float timezoneLines = 0.0;
          float longitude = (vUv.x - 0.5) * 2.0 * 3.14159;
          float latitude = (vUv.y - 0.5) * 3.14159;
          
          // Only show timezone lines on land (where there are continents)
          if (gray > 0.3) { // Land areas
            float currentOffset = getTimezoneOffset(longitude);
            
            // Sample nearby pixels to detect timezone changes
            float leftLongitude = ((vUv.x - step) - 0.5) * 2.0 * 3.14159;
            float rightLongitude = ((vUv.x + step) - 0.5) * 2.0 * 3.14159;
            
            float leftOffset = getTimezoneOffset(leftLongitude);
            float rightOffset = getTimezoneOffset(rightLongitude);
            
            // Detect timezone boundaries
            if (abs(currentOffset - leftOffset) > 0.5 || abs(currentOffset - rightOffset) > 0.5) {
              timezoneLines = 1.0;
            }
          }
          
          // Create green outline effect
          vec3 greenColor = vec3(0.133, 0.773, 0.333); // #22c55e
          vec3 backgroundColor = vec3(0.039, 0.039, 0.039); // #0a0a0a
          
          // Combine edge detection with timezone lines
          float combinedEffect = max(edge, timezoneLines);
          
          // Mix between background and green based on combined effect
          vec3 finalColor = mix(backgroundColor, greenColor, combinedEffect);
          
          // Add subtle pulsing effect
          float pulse = 0.8 + 0.2 * sin(time * 2.0);
          finalColor *= pulse;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `;
      
      material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          time: { value: 0.0 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true
      });
    } else {
      // Create a procedural world map texture (only in browser)
      if (typeof document === 'undefined') {
        // Fallback material for SSR
        material = new THREE.MeshPhongMaterial({
          color: 0x22c55e,
          shininess: 50,
          specular: 0x22c55e,
          emissive: 0x001100,
          transparent: true,
          opacity: 0.9,
        });
      } else {
        const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Draw a simple world map pattern
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 1024, 512);
      
      // Draw continents in terminal green
      ctx.fillStyle = '#22c55e';
      ctx.globalAlpha = 0.8;
      
      // Simple continent shapes (very basic representation)
      const continents = [
        { x: 100, y: 200, w: 200, h: 150 }, // North America
        { x: 350, y: 180, w: 150, h: 200 }, // Europe/Africa
        { x: 550, y: 200, w: 200, h: 120 }, // Asia
        { x: 200, y: 350, w: 100, h: 80 },  // South America
        { x: 600, y: 350, w: 120, h: 60 },  // Australia
      ];
      
      continents.forEach(continent => {
        ctx.fillRect(continent.x, continent.y, continent.w, continent.h);
      });
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      
        material = new THREE.MeshPhongMaterial({
          map: texture,
          shininess: 50,
          specular: 0x22c55e,
          emissive: 0x001100,
          transparent: true,
          opacity: 0.9,
        });
      }
    }

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Create atmosphere glow effect
    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.02, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;

    // Lighting - Terminal themed for green outline
    const ambientLight = new THREE.AmbientLight(0x001100, 0.6);
    scene.add(ambientLight);

    // Main directional light with green tint
    const directionalLight = new THREE.DirectionalLight(0x22c55e, 0.8);
    directionalLight.position.set(10, 5, 5);
    scene.add(directionalLight);

    // Secondary light for rim lighting
    const rimLight = new THREE.DirectionalLight(0x22c55e, 0.4);
    rimLight.position.set(-10, -5, -5);
    scene.add(rimLight);

    // Add a subtle glow effect
    const glowGeometry = new THREE.SphereGeometry(radius * 1.05, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    glowRef.current = glow;

    // Mouse interaction with enhanced feedback
    const handleMouseDown = (_e: MouseEvent) => {
      isDraggingRef.current = true;
      renderer.domElement.style.cursor = 'grabbing';
      
      // Add visual feedback - slightly increase glow
      if (atmosphereRef.current && atmosphereRef.current.material instanceof THREE.MeshBasicMaterial) {
        atmosphereRef.current.material.opacity = 0.3;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current && globeRef.current) {
        const deltaX = e.offsetX - previousMousePositionRef.current.x;
        const deltaY = e.offsetY - previousMousePositionRef.current.y;

        globeRef.current.rotation.y += deltaX * 0.01;
        globeRef.current.rotation.x += deltaY * 0.01;
        
        // Also rotate atmosphere
        if (atmosphereRef.current) {
          atmosphereRef.current.rotation.y += deltaX * 0.01;
          atmosphereRef.current.rotation.x += deltaY * 0.01;
        }
      }

      previousMousePositionRef.current = { x: e.offsetX, y: e.offsetY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      renderer.domElement.style.cursor = 'grab';
      
      // Reset glow
      if (atmosphereRef.current && atmosphereRef.current.material instanceof THREE.MeshBasicMaterial) {
        atmosphereRef.current.material.opacity = 0.2;
      }
    };

    const handleMouseEnter = () => {
      renderer.domElement.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      renderer.domElement.style.cursor = 'default';
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mouseenter', handleMouseEnter);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
    renderer.domElement.style.cursor = 'grab';

    // Animation loop with enhanced effects
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (
        autoRotate &&
        !isDraggingRef.current &&
        globeRef.current
      ) {
        globeRef.current.rotation.y += rotationSpeed;
        
        // Also rotate atmosphere and glow
        if (atmosphereRef.current) {
          atmosphereRef.current.rotation.y += rotationSpeed;
        }
        if (glowRef.current) {
          glowRef.current.rotation.y += rotationSpeed;
        }
      }

      // Update shader time uniform
      if (material instanceof THREE.ShaderMaterial) {
        material.uniforms.time.value = Date.now() * 0.001;
      }

      // Add subtle pulsing effect to the glow
      if (atmosphereRef.current && atmosphereRef.current.material instanceof THREE.MeshBasicMaterial) {
        const time = Date.now() * 0.001;
        atmosphereRef.current.material.opacity = 0.2 + Math.sin(time * 2) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Remove event listeners
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
      renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      
      // Remove renderer from DOM
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials
      geometry.dispose();
      if (material instanceof THREE.MeshPhongMaterial || material instanceof THREE.ShaderMaterial) {
        material.dispose();
      }
      
      // Cleanup timezone texture if used
      if (timezoneTextureData) {
        timezoneTextureData.cleanup();
      }
      
      if (atmosphereRef.current) {
        atmosphereRef.current.geometry.dispose();
        if (atmosphereRef.current.material instanceof THREE.MeshBasicMaterial) {
          atmosphereRef.current.material.dispose();
        }
      }
      
      if (glowRef.current) {
        glowRef.current.geometry.dispose();
        if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
          glowRef.current.material.dispose();
        }
      }
      
      renderer.dispose();
    };
  }, [radius, textureUrl, timezonePreset, autoRotate, rotationSpeed, timezoneTextureData]);

  return <div ref={containerRef} className="three-globe-container" />;
};