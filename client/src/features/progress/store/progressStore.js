import { create } from 'zustand';
import toast from 'react-hot-toast';
import { fetchProgress, patchProgress } from '../services/progress.service.js';

let saveTimer = null;

export const useProgressStore = create((set, get) => ({
  lastPosition: null,
  chaptersRead: {},
  bookmarks: [],
  isLoaded: false,

  loadProgress: async () => {
    try {
      const data = await fetchProgress();
      set({
        lastPosition: data.lastPosition,
        chaptersRead: data.chaptersRead || {},
        bookmarks: data.bookmarks || [],
        isLoaded: true,
      });
    } catch {
      set({ isLoaded: true });
    }
  },

  // تحديث تفاؤلي فوري + حفظ مؤجّل على الخادم
  savePosition: (chapter, verse) => {
    const { chaptersRead } = get();
    const key = String(chapter);
    set({
      lastPosition: { chapter, verse },
      chaptersRead: {
        ...chaptersRead,
        [key]: Math.max(chaptersRead[key] || 0, verse),
      },
    });
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      patchProgress({ lastPosition: { chapter, verse } }).catch(() => {});
    }, 1500);
  },

  toggleBookmark: async (verseKey) => {
    const previous = get().bookmarks;
    const exists = previous.includes(verseKey);
    set({
      bookmarks: exists
        ? previous.filter((key) => key !== verseKey)
        : [...previous, verseKey],
    });
    try {
      await patchProgress({ toggleBookmark: verseKey });
      toast.success(exists ? 'أُزيلت العلامة' : 'أُضيفت علامة مرجعية');
    } catch (error) {
      set({ bookmarks: previous });
      toast.error(error.message);
    }
  },
}));
