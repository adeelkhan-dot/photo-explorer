import { useEffect, useRef, useState, useCallback } from "react";
import { fetchPicsum } from "../api/api";
import { PicsumPhoto } from "../types/types";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PicsumPhoto[]>([]);
  const [allPhotos, setAllPhotos] = useState<PicsumPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCache = useRef<Record<string, PicsumPhoto[]>>({});
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Load photos on mount
  useEffect(() => {
    fetchInitialPhotos();
  }, []);

  const fetchInitialPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const photos = await fetchPicsum(1, 50);
      setAllPhotos(photos);
      setResults(photos);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to fetch photos";
      setError(`Unable to load photos. ${errorMessage}`);
      console.error("Search fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const performSearch = useCallback( async (text: string) => {
    setSearching(true);
    await new Promise((r) => setTimeout(r, 400));
    if (!text.trim()) {
      setResults(allPhotos);
      setSearching(false);
      return;
    }

    const normalizedQuery = text.toLowerCase().trim();

    if (searchCache.current[normalizedQuery]) {
      setResults(searchCache.current[normalizedQuery]);
      setSearching(false);
      return;
    }

    const filtered = allPhotos.filter((p) =>
      p.author.toLowerCase().includes(normalizedQuery) ||
      p.id.toString().includes(normalizedQuery)
    );

    searchCache.current[normalizedQuery] = filtered;
    setResults(filtered);
    setSearching(false);
  }, [allPhotos]);

  const search = useCallback((text: string) => {
    setQuery(text);

    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      performSearch(text);
    }, 350);
  }, [performSearch]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    query,
    search,
    loading,
    searching,
    error,
    results,
    refetch: fetchInitialPhotos,
  };
}
