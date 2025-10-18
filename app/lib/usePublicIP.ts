import { useState, useEffect } from 'react';

export function usePublicIP() {
  const [publicIP, setPublicIP] = useState<string>('Loading...');
  const [userAgent, setUserAgent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicIP = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setUserAgent(navigator.userAgent);
        // Try multiple IP services for reliability
        const services = [
          'https://api.ipify.org?format=json',
          'https://ipapi.co/json/',
          'https://api.ip.sb/geoip'
        ];

        for (const service of services) {
          try {
            const response = await fetch(service, { 
              signal: AbortSignal.timeout(5000) // 5 second timeout
            });
            
            if (response.ok) {
              const data = await response.json();
              const ip = data.ip || data.query || data.ipAddress;
              if (ip) {
                setPublicIP(ip);
                setIsLoading(false);
                return;
              }
            }
          } catch (serviceError) {
            // Try next service
            continue;
          }
        }
        
        // If all services fail
        setError('Unable to fetch IP');
        setPublicIP('Unknown');
        setIsLoading(false);
      } catch (err) {
        setError('Network error');
        setPublicIP('Unknown');
        setIsLoading(false);
      }
    };

    fetchPublicIP();
  }, []);

  return { publicIP, userAgent, isLoading, error };
}
