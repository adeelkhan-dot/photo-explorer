import axios from 'axios';

export type PicsumPhoto = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const picsum = axios.create({ baseURL: 'https://picsum.photos' });

// Simple in-memory cache for session
const cache = new Map<string, any>();

export async function fetchPicsum(page = 1, limit = 30) {
  const key = `picsum:${page}:${limit}`;
  if (cache.has(key)) return cache.get(key) as PicsumPhoto[];

  const res = await picsum.get<PicsumPhoto[]>(`/v2/list?page=${page}&limit=${limit}`);
  cache.set(key, res.data);
  return res.data;
}
