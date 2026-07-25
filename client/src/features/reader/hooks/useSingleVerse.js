import { useEffect, useState } from 'react';
import { fetchVerse } from '../services/reader.service.js';

export const useSingleVerse = (chapter, verse, reciterId) => {
  const [verseData, setVerseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    fetchVerse({ chapter, verse, reciterId })
      .then((data) => !cancelled && setVerseData(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setIsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [chapter, verse, reciterId, retryToken]);

  return {
    verseData,
    isLoading,
    error,
    retry: () => setRetryToken((token) => token + 1),
  };
};
