import { useState, useEffect } from 'react';
import { PicsumPhoto } from '../features/feed/types';
import axios from 'axios';

const cache = new Map<string, any>();

export function useFeed(pageSize = 30) {
  const [photos, setPhotos] = useState<PicsumPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async (pageNum: number) => {
    const key = `picsum:${pageNum}`;
    if (cache.has(key)) return cache.get(key);
    const res = await axios.get<PicsumPhoto[]>(`https://picsum.photos/v2/list?page=${pageNum}&limit=${pageSize}`);
    cache.set(key, res.data);
    return res.data;
  };

  const loadPage = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await fetchPhotos(pageNum);
      setPhotos(prev => pageNum === 1 ? data : [...prev, ...data]);
    } catch (err) {
      console.warn('Feed fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPage(1); }, []);

  return { photos, loadPage, page, setPage, loading };
}
