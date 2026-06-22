import { useState, useCallback, useRef } from "react";

export interface GeoResult {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    country?: string;
  };
}

export function useGeocoding() {
  const [results, setResults] = useState<GeoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((query: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 2) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`,
          {
            headers: {
              "Accept-Language": "fr",
              "User-Agent": "WiseTrip/1.0",
            },
          },
        );
        const data = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);
  }, []);

  const clear = useCallback(() => setResults([]), []);

  return { results, isLoading, search, clear };
}
