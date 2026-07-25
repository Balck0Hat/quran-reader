import { useEffect } from 'react';
import { useProgressStore } from '../../progress/index.js';

// يتتبع الآية الظاهرة في منتصف الشاشة ويحفظ الموضع تلقائياً
export const useReadingTracker = (chapterId, versesCount) => {
  const savePosition = useProgressStore((state) => state.savePosition);

  useEffect(() => {
    if (!versesCount) return;
    const elements = document.querySelectorAll('[data-verse]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const verse = Number(entry.target.dataset.verse);
          savePosition(Number(chapterId), verse);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [chapterId, versesCount, savePosition]);
};
