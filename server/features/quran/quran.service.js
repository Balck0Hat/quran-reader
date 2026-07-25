import { env } from '../../shared/config/env.js';
import { fetchJsonCached } from '../../shared/utils/fetchJson.js';

const withAudioUrl = (verse) => ({
  ...verse,
  audio: verse.audio
    ? { ...verse.audio, url: `${env.audioCdnBase}/${verse.audio.url}` }
    : null,
});

export const getChapters = async () => {
  const data = await fetchJsonCached(
    `${env.quranApiBase}/chapters?language=ar`
  );
  return data.chapters;
};

export const getVerses = async ({ chapterId, page, perPage, reciterId }) => {
  const params = new URLSearchParams({
    language: 'ar',
    words: 'false',
    fields: 'text_uthmani',
    audio: String(reciterId),
    per_page: String(perPage),
    page: String(page),
  });
  const data = await fetchJsonCached(
    `${env.quranApiBase}/verses/by_chapter/${chapterId}?${params}`
  );
  return {
    verses: data.verses.map(withAudioUrl),
    pagination: data.pagination,
  };
};

export const getReciters = async () => {
  const data = await fetchJsonCached(
    `${env.quranApiBase}/resources/recitations?language=ar`
  );
  return data.recitations;
};
