import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useProgressStore } from '../features/progress/store/progressStore.js';

export const AppProviders = ({ children }) => {
  const loadProgress = useProgressStore((state) => state.loadProgress);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <>
      {children}
      <Toaster
        position="top-left"
        toastOptions={{
          duration: 4000,
          className:
            '!bg-neutral-100 !text-neutral-900 dark:!bg-neutral-900 dark:!text-neutral-100 !rounded-xl !border !border-neutral-200 dark:!border-neutral-800',
        }}
      />
    </>
  );
};
