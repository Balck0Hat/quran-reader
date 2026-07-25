import { env } from '../../shared/config/env.js';
import { fetchJsonCached } from '../../shared/utils/fetchJson.js';
import { AppError } from '../../shared/utils/appError.js';
import { TAFSIRS, LINGUISTIC_SOURCES } from './insight.constants.js';

export const listTafsirs = () => TAFSIRS;

export const getTafsir = async ({ tafsirId, chapter, verse }) => {
  if (!TAFSIRS.some((t) => t.id === tafsirId)) {
    throw new AppError('التفسير المطلوب غير متوفر', 404, 'TAFSIR_NOT_FOUND');
  }
  const data = await fetchJsonCached(
    `${env.quranApiBase}/tafsirs/${tafsirId}/by_ayah/${chapter}:${verse}`
  );
  return {
    text: data.tafsir?.text || '',
    source: TAFSIRS.find((t) => t.id === tafsirId)?.name,
  };
};

export const getLinguistic = async ({ kind, chapter, verse }) => {
  const slug = LINGUISTIC_SOURCES[kind];
  if (!slug) {
    throw new AppError('نوع المصدر غير معروف', 400, 'UNKNOWN_SOURCE');
  }
  const data = await fetchJsonCached(
    `${env.tafsirCdnBase}/${slug}/${chapter}/${verse}.json`
  );
  return { text: data.text || '' };
};
