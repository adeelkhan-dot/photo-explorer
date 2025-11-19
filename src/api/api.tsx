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
const jsonplaceholder = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' });

// Simple in-memory cache for session
const cache = new Map<string, any>();

export async function fetchPicsum(page = 1, limit = 30) {
  const key = `picsum:${page}:${limit}`;
  if (cache.has(key)) return cache.get(key) as PicsumPhoto[];

  const res = await picsum.get<PicsumPhoto[]>(`/v2/list?page=${page}&limit=${limit}`);
  cache.set(key, res.data);
  return res.data;
}

export async function fetchCommentsForPhoto(photoId: number) {
  // mapping postId = (photoId % 100) + 1
  const postId = (photoId % 100) + 1;
  const key = `comments:${postId}`;
  if (cache.has(key)) return cache.get(key);
  const res = await jsonplaceholder.get(`/comments?postId=${postId}`);
  cache.set(key, res.data);
  return res.data;
}
