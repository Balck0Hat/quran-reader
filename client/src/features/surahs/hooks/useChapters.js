import { useCallback, useEffect, useState } from 'react';
import { fetchChapters } from '../services/surahs.service.js';

export const useChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setChapters(await fetchChapters());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { chapters, isLoading, error, reload: load };
};
