import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Pause,
  Bookmark,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import {
  IconButton,
  Skeleton,
  ErrorState,
  ThemeToggle,
} from '../../shared/components/ui/index.js';
import { toArabicNumber } from '../../shared/utils/arabicNumber.js';
import { cn } from '../../shared/utils/cn.js';
import { useProgressStore } from '../progress/index.js';
import { useReaderStore } from './store/readerStore.js';
import { useReaderMeta } from './hooks/useReaderMeta.js';
import { useSingleVerse } from './hooks/useSingleVerse.js';
import { useAudioPlayer } from './hooks/useAudioPlayer.js';
import InsightTabs from './components/InsightTabs.jsx';

const NavButton = ({ disabled, onClick, children }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={cn(
      'inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 shadow-sm transition-colors',
      'hover:border-primary-300 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
      'disabled:pointer-events-none disabled:opacity-40',
      'dark:border-neutral-800 dark:bg-neutral-925 dark:text-neutral-300 dark:hover:text-primary-400'
    )}
  >
    {children}
  </button>
);

const AyahPage = () => {
  const { chapterId, verseNumber } = useParams();
  const chapter = Number(chapterId);
  const verse = Number(verseNumber);
  const verseKey = `${chapter}:${verse}`;
  const navigate = useNavigate();

  const { chapter: meta, tafsirs } = useReaderMeta(chapterId);
  const reciterId = useReaderStore((state) => state.reciterId);
  const { verseData, isLoading, error, retry } = useSingleVerse(chapter, verse, reciterId);
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const toggleBookmark = useProgressStore((state) => state.toggleBookmark);
  const savePosition = useProgressStore((state) => state.savePosition);
  const { playingKey, isPlaying, playVerse, stop } = useAudioPlayer({});

  useEffect(() => {
    savePosition(chapter, verse);
    window.scrollTo({ top: 0 });
  }, [chapter, verse, savePosition]);

  useEffect(() => () => stop(), [verseKey, stop]);

  const total = meta?.verses_count || 0;
  const goTo = (target) => navigate(`/surah/${chapter}/ayah/${target}`);
  const isCurrentPlaying = playingKey === verseKey && isPlaying;

  return (
    <main className="min-h-screen pb-24">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-2 px-4">
          <Link
            to={`/surah/${chapter}?ayah=${verse}`}
            aria-label="العودة للقراءة المتصلة"
            title="العودة للقراءة المتصلة"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-neutral-400 dark:hover:bg-neutral-900"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="font-display text-xl text-neutral-900 dark:text-neutral-100">
            {meta ? `سورة ${meta.name_arabic}` : '…'}
          </h1>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            · الآية {toArabicNumber(verse)}
          </span>
          <div className="ms-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4">
        <div className="relative mt-6 rounded-2xl border border-primary-300/60 bg-white px-6 py-8 text-center shadow-sm dark:border-primary-800/50 dark:bg-neutral-925">
          <span aria-hidden="true" className="absolute inset-2 rounded-xl border border-primary-200 dark:border-primary-900/60" />
          {isLoading && <Skeleton className="mx-auto h-24 max-w-xl" />}
          {error && !isLoading && <ErrorState message={error} onRetry={retry} />}
          {verseData && !isLoading && !error && (
            <>
              <p dir="rtl" className="quran-text relative text-3xl text-neutral-900 dark:text-neutral-100">
                {verseData.text_uthmani}
              </p>
              <div className="relative mt-4 flex items-center justify-center gap-2">
                <IconButton
                  label={isCurrentPlaying ? 'إيقاف مؤقت' : 'استماع'}
                  active={playingKey === verseKey}
                  onClick={() => playVerse(verseKey, verseData.audio?.url)}
                >
                  {isCurrentPlaying ? (
                    <Pause className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Play className="h-5 w-5" aria-hidden="true" />
                  )}
                </IconButton>
                <IconButton
                  label={bookmarks.includes(verseKey) ? 'إزالة العلامة' : 'علامة مرجعية'}
                  active={bookmarks.includes(verseKey)}
                  onClick={() => toggleBookmark(verseKey)}
                >
                  <Bookmark
                    className={cn('h-5 w-5', bookmarks.includes(verseKey) && 'fill-current')}
                    aria-hidden="true"
                  />
                </IconButton>
              </div>
            </>
          )}
        </div>

        <div className="mt-6">
          <InsightTabs verseKey={verseKey} tafsirs={tafsirs} />
        </div>
      </div>

      <nav
        aria-label="التنقل بين الآيات"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-neutral-50/95 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/95"
      >
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-2 px-4">
          <NavButton disabled={verse <= 1} onClick={() => goTo(verse - 1)}>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            السابقة
          </NavButton>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {toArabicNumber(verse)} من {total ? toArabicNumber(total) : '…'}
          </span>
          <NavButton disabled={total > 0 && verse >= total} onClick={() => goTo(verse + 1)}>
            التالية
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </NavButton>
        </div>
      </nav>
    </main>
  );
};

export default AyahPage;
