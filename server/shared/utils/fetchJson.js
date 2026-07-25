import { AppError } from './appError.js';
import { cacheGet, cacheSet } from './cache.js';

const DAY_MS = 24 * 60 * 60 * 1000;

// Quran text/tafsir data is immutable — cache aggressively (7 days).
export const fetchJsonCached = async (url, { ttlMs = 7 * DAY_MS } = {}) => {
  const cached = cacheGet(url);
  if (cached) return cached;

  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new AppError(
      `تعذّر جلب البيانات من المصدر (${response.status})`,
      response.status === 404 ? 404 : 502,
      'UPSTREAM_ERROR'
    );
  }

  const data = await response.json();
  cacheSet(url, data, ttlMs);
  return data;
};
