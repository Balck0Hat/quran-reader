import { useEffect, useState } from 'react';
import {
  fetchTafsirText,
  fetchLinguisticText,
} from '../services/reader.service.js';

export const useInsight = ({ tab, verseKey, tafsirId, isOpen }) => {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!isOpen || !verseKey) return;
    const [chapter, verse] = verseKey.split(':').map(Number);
    let cancelled = false;

    setIsLoading(true);
    setError(null);
    setText('');

    const request =
      tab === 'tafsir'
        ? fetchTafsirText({ tafsirId, chapter, verse })
        : fetchLinguisticText({ kind: tab, chapter, verse });

    request
      .then((data) => {
        if (cancelled) return;
        setText(data.text || '');
        setSource(data.source || '');
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [tab, verseKey, tafsirId, isOpen, retryToken]);

  return { text, source, isLoading, error, retry: () => setRetryToken((t) => t + 1) };
};
