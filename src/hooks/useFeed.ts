import { useState, useEffect } from 'react';
import { PicsumPhoto } from '../features/feed/types';
import axios from 'axios';
import { fetchPicsum } from '../api/api';

const cache = new Map<string, any>();

export function useFeed(pageSize = 30) {
  const [photos, setPhotos] = useState<PicsumPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadPage = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await fetchPicsum(pageNum,pageSize);
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
