import { useCallback, useEffect, useState } from 'react';
import { todayKey } from '../../progress/utils/wird.js';

const STORAGE_KEY = 'rattil-adhkar';

const load = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.date === todayKey()) return stored.counts;
  } catch {
    /* تنسيق قديم */
  }
  return {};
};

// عدّاد الأذكار لليوم الحالي — يُصفَّر تلقائياً مع كل يوم جديد
export const useAdhkarDay = () => {
  const [counts, setCounts] = useState(load);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: todayKey(), counts })
    );
  }, [counts]);

  const increment = useCallback((id, max) => {
    setCounts((previous) => ({
      ...previous,
      [id]: Math.min((previous[id] || 0) + 1, max),
    }));
  }, []);

  const resetCategory = useCallback((ids) => {
    setCounts((previous) => {
      const next = { ...previous };
      ids.forEach((id) => delete next[id]);
      return next;
    });
  }, []);

  return { counts, increment, resetCategory };
};
