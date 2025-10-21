import { useState, useEffect } from 'react';
import type { LocationData } from '../types';

const LOCATION_CACHE_KEY = 'worldclock_location_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useCachedIPLocation(publicIP: string) {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicIP || publicIP === 'Loading...' || publicIP === 'Unknown') {
      return;
    }

    const fetchLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check cache first
        const cachedData = getCachedLocation(publicIP);
        if (cachedData) {
          setLocationData(cachedData);
          setIsLoading(false);
          return;
        }

        // Fetch new location data
        const geoResponse = await fetch(`https://ipapi.co/${publicIP}/json/`);
        if (!geoResponse.ok) {
          throw new Error('Failed to get location');
        }

        const geoData = await geoResponse.json();
        const { latitude, longitude, city, region, country } = geoData;

        if (!latitude || !longitude) {
          throw new Error('Invalid location data');
        }

        const location: LocationData = {
          latitude,
          longitude,
          city: city || 'Unknown',
          region: region || 'Unknown',
          country: country || 'Unknown',
          ip: publicIP,
          timestamp: Date.now(),
        };

        // Cache the location data
        cacheLocation(location);
        setLocationData(location);
        setIsLoading(false);
      } catch (err) {
        console.error('Location fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load location');
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [publicIP]);

  return { locationData, isLoading, error };
}

function getCachedLocation(ip: string): LocationData | null {
  try {
    const cached = localStorage.getItem(LOCATION_CACHE_KEY);
    if (!cached) return null;

    const cacheData = JSON.parse(cached);
    
    // Check if cached data is for the same IP and still valid
    if (cacheData.ip === ip && isCacheValid(cacheData.timestamp)) {
      return cacheData;
    }
    
    return null;
  } catch (error) {
    console.error('Error reading location cache:', error);
    return null;
  }
}

function cacheLocation(location: LocationData): void {
  try {
    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(location));
  } catch (error) {
    console.error('Error caching location:', error);
  }
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}
