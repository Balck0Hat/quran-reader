import { apiFetch } from '../../../shared/api/client.js';

let chaptersCache = null;
const verseCache = new Map();

export const fetchChapterNames = async () => {
  if (chaptersCache) return chaptersCache;
  const { data } = await apiFetch('/quran/chapters');
  chaptersCache = new Map(data.map((chapter) => [chapter.id, chapter]));
  return chaptersCache;
};

export const fetchVerseText = async (chapter, verse) => {
  const key = `${chapter}:${verse}`;
  if (verseCache.has(key)) return verseCache.get(key);
  const { data } = await apiFetch(`/quran/verse/${chapter}/${verse}`);
  verseCache.set(key, data.text_uthmani);
  return data.text_uthmani;
};
