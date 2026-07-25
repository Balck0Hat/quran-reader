import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const FONT_SIZES = ['1.35rem', '1.6rem', '1.9rem', '2.25rem', '2.6rem'];

export const useReaderStore = create(
  persist(
    (set) => ({
      reciterId: 7,
      tafsirId: 16,
      fontLevel: 2,

      setReciterId: (reciterId) => set({ reciterId: Number(reciterId) }),
      setTafsirId: (tafsirId) => set({ tafsirId: Number(tafsirId) }),
      increaseFont: () =>
        set((state) => ({
          fontLevel: Math.min(FONT_SIZES.length - 1, state.fontLevel + 1),
        })),
      decreaseFont: () =>
        set((state) => ({ fontLevel: Math.max(0, state.fontLevel - 1) })),
    }),
    { name: 'rattil-reader-settings' }
  )
);
