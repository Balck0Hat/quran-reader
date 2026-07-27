import { useCallback, useEffect, useState } from 'react';
import { todayKey } from '../../progress/utils/wird.js';

const STORAGE_KEY = 'rattil-tasbih';

const load = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored) {
      return {
        count: stored.date === todayKey() ? stored.count : 0,
        todayTotal: stored.date === todayKey() ? stored.todayTotal : 0,
        dhikrIndex: stored.dhikrIndex || 0,
        target: stored.target || 33,
      };
    }
  } catch {
    /* تنسيق قديم */
  }
  return { count: 0, todayTotal: 0, dhikrIndex: 0, target: 33 };
};

// مسبحة حرة: عدّاد الجولة + مجموع اليوم، محفوظة محلياً وتُصفَّر الجولة مع اليوم الجديد
export const useTasbih = () => {
  const [state, setState] = useState(load);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, date: todayKey() })
    );
  }, [state]);

  const tap = useCallback(() => {
    if (navigator.vibrate) navigator.vibrate(12);
    setState((previous) => {
      const next = previous.count + 1;
      const lapDone = previous.target > 0 && next >= previous.target;
      if (lapDone && navigator.vibrate) navigator.vibrate([30, 40, 30]);
      return {
        ...previous,
        count: lapDone ? 0 : next,
        todayTotal: previous.todayTotal + 1,
      };
    });
  }, []);

  const setDhikrIndex = useCallback(
    (dhikrIndex) => setState((previous) => ({ ...previous, dhikrIndex })),
    []
  );

  const setTarget = useCallback(
    (target) => setState((previous) => ({ ...previous, target, count: 0 })),
    []
  );

  const reset = useCallback(
    () => setState((previous) => ({ ...previous, count: 0 })),
    []
  );

  return { ...state, tap, setDhikrIndex, setTarget, reset };
};
