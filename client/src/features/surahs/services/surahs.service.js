import { apiFetch } from '../../../shared/api/client.js';

let chaptersCache = null;

export const fetchChapters = async () => {
  if (chaptersCache) return chaptersCache;
  const { data } = await apiFetch('/quran/chapters');
  chaptersCache = data;
  return data;
};
