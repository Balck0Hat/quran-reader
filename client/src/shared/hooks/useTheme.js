import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'rattil-theme';
const listeners = new Set();

const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => document.documentElement.classList.contains('dark');

export const useTheme = () => {
  const isDark = useSyncExternalStore(subscribe, getSnapshot);

  const toggleTheme = useCallback(() => {
    const next = !getSnapshot();
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    notify();
  }, []);

  return { isDark, toggleTheme };
};
