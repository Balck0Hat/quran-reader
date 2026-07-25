import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchVerses } from '../services/reader.service.js';

export const useVerses = (chapterId, reciterId) => {
  const [verses, setVerses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const pageRef = useRef(1);
  const busyRef = useRef(false);

  const loadPage = useCallback(
    async (page) => {
      const result = await fetchVerses({ chapterId, page, reciterId });
      pageRef.current = page;
      setHasMore(Boolean(result.meta?.next_page));
      setVerses((prev) =>
        page === 1 ? result.verses : [...prev, ...result.verses]
      );
      return result;
    },
    [chapterId, reciterId]
  );

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setVerses([]);
    loadPage(1)
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setIsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [loadPage]);

  const loadMore = useCallback(async () => {
    if (busyRef.current || !hasMore) return;
    busyRef.current = true;
    setIsLoadingMore(true);
    try {
      await loadPage(pageRef.current + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      busyRef.current = false;
      setIsLoadingMore(false);
    }
  }, [hasMore, loadPage]);

  // حمّل الصفحات تباعاً حتى تصل الآية المطلوبة (للقفز من "تابع القراءة")
  const loadUntil = useCallback(
    async (verseNumber) => {
      let page = pageRef.current;
      while (page * 50 < verseNumber) {
        page += 1;
        try {
          const result = await loadPage(page);
          if (!result.meta?.next_page) break;
        } catch {
          break;
        }
      }
    },
    [loadPage]
  );

  return { verses, isLoading, isLoadingMore, error, hasMore, loadMore, loadUntil };
};
