import { useEffect, useState } from 'react';
import { fetchChapters } from '../../surahs/index.js';
import { fetchReciters, fetchTafsirsList } from '../services/reader.service.js';

export const useReaderMeta = (chapterId) => {
  const [chapter, setChapter] = useState(null);
  const [reciters, setReciters] = useState([]);
  const [tafsirs, setTafsirs] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchChapters()
      .then((chapters) => {
        if (!cancelled) {
          setChapter(chapters.find((c) => c.id === Number(chapterId)) || null);
        }
      })
      .catch(() => {});
    fetchReciters()
      .then((data) => !cancelled && setReciters(data))
      .catch(() => {});
    fetchTafsirsList()
      .then((data) => !cancelled && setTafsirs(data))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [chapterId]);

  return { chapter, reciters, tafsirs };
};
