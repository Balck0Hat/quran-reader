import { apiFetch } from '../../../shared/api/client.js';

const insightCache = new Map();

export const fetchVerses = async ({ chapterId, page, reciterId }) => {
  const { data, meta } = await apiFetch(
    `/quran/chapters/${chapterId}/verses?page=${page}&perPage=50&reciter=${reciterId}`
  );
  return { verses: data, meta };
};

let recitersCache = null;
let tafsirsCache = null;

export const fetchReciters = async () => {
  if (recitersCache) return recitersCache;
  const { data } = await apiFetch('/quran/reciters');
  recitersCache = data;
  return data;
};

export const fetchTafsirsList = async () => {
  if (tafsirsCache) return tafsirsCache;
  const { data } = await apiFetch('/insight/tafsirs');
  tafsirsCache = data;
  return data;
};

export const fetchTafsirText = async ({ tafsirId, chapter, verse }) => {
  const key = `tafsir:${tafsirId}:${chapter}:${verse}`;
  if (insightCache.has(key)) return insightCache.get(key);
  const { data } = await apiFetch(`/insight/tafsir/${tafsirId}/${chapter}/${verse}`);
  insightCache.set(key, data);
  return data;
};

export const fetchLinguisticText = async ({ kind, chapter, verse }) => {
  const key = `${kind}:${chapter}:${verse}`;
  if (insightCache.has(key)) return insightCache.get(key);
  const { data } = await apiFetch(`/insight/${kind}/${chapter}/${verse}`);
  insightCache.set(key, data);
  return data;
};
