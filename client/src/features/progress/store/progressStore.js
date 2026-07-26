import { create } from 'zustand';
import toast from 'react-hot-toast';
import {
  fetchProgress,
  patchProgress,
  sendProgressBeacon,
} from '../services/progress.service.js';
import { todayKey } from '../utils/wird.js';

const SEEN_KEY = 'rattil-wird-seen';

// دفعة حفظ واحدة مؤجلة تجمع الموضع وعدّاد الورد معاً
let pendingPatch = {};
let patchTimer = null;
const queuePatch = (partial) => {
  if (partial.lastPosition) pendingPatch.lastPosition = partial.lastPosition;
  if (partial.wird) {
    const previous = pendingPatch.wird;
    pendingPatch.wird =
      previous && previous.date === partial.wird.date
        ? { date: previous.date, delta: previous.delta + partial.wird.delta }
        : partial.wird;
  }
  clearTimeout(patchTimer);
  patchTimer = setTimeout(() => {
    const payload = pendingPatch;
    pendingPatch = {};
    patchProgress(payload).catch(() => {});
  }, 1500);
};

// عند مغادرة الصفحة أو إخفائها نرسل ما تبقى فوراً حتى لا يضيع العدّاد
const flushPending = () => {
  if (Object.keys(pendingPatch).length === 0) return;
  const payload = pendingPatch;
  pendingPatch = {};
  clearTimeout(patchTimer);
  sendProgressBeacon(payload);
};
window.addEventListener('pagehide', flushPending);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushPending();
});

const loadSeen = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(SEEN_KEY));
    if (stored?.date === todayKey()) return new Set(stored.keys);
  } catch {
    /* تنسيق قديم — نبدأ من جديد */
  }
  return new Set();
};
let seenToday = loadSeen();

export const useProgressStore = create((set, get) => ({
  lastPosition: null,
  chaptersRead: {},
  bookmarks: [],
  dailyGoal: 10,
  dailyLog: {},
  isLoaded: false,

  loadProgress: async () => {
    try {
      const data = await fetchProgress();
      set({
        lastPosition: data.lastPosition,
        chaptersRead: data.chaptersRead || {},
        bookmarks: data.bookmarks || [],
        dailyGoal: data.dailyGoal || 10,
        dailyLog: data.dailyLog || {},
        isLoaded: true,
      });
    } catch {
      set({ isLoaded: true });
    }
  },

  // تحديث تفاؤلي فوري + حفظ مؤجّل، مع عدّ الآية في ورد اليوم مرة واحدة
  savePosition: (chapter, verse) => {
    const { chaptersRead, dailyLog } = get();
    const chapterKey = String(chapter);
    const update = {
      lastPosition: { chapter, verse },
      chaptersRead: {
        ...chaptersRead,
        [chapterKey]: Math.max(chaptersRead[chapterKey] || 0, verse),
      },
    };

    const today = todayKey();
    if (seenToday.size > 0 && !localStorage.getItem(SEEN_KEY)?.includes(today)) {
      seenToday = new Set();
    }
    const verseKey = `${chapter}:${verse}`;
    let wird = null;
    if (!seenToday.has(verseKey)) {
      seenToday.add(verseKey);
      localStorage.setItem(
        SEEN_KEY,
        JSON.stringify({ date: today, keys: [...seenToday] })
      );
      update.dailyLog = { ...dailyLog, [today]: (dailyLog[today] || 0) + 1 };
      wird = { date: today, delta: 1 };
    }

    set(update);
    queuePatch({ lastPosition: { chapter, verse }, ...(wird && { wird }) });
  },

  setDailyGoal: async (goal) => {
    const previous = get().dailyGoal;
    set({ dailyGoal: goal });
    try {
      await patchProgress({ dailyGoal: goal });
    } catch (error) {
      set({ dailyGoal: previous });
      toast.error(error.message);
    }
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
