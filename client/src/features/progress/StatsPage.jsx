import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookCheck, Bookmark, CheckCircle2, LibraryBig, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../../shared/components/ui/index.js';
import { toArabicNumber } from '../../shared/utils/arabicNumber.js';
import { useProgressStore } from './store/progressStore.js';
import { fetchChapterNames } from './services/quranRefs.service.js';
import ProgressRing from './components/ProgressRing.jsx';
import StatTile from './components/StatTile.jsx';
import SurahProgressRow from './components/SurahProgressRow.jsx';

const TOTAL_AYAHS = 6236;

const SectionTitle = ({ children }) => (
  <h2 className="mb-3 mt-8 font-display text-lg text-neutral-900 dark:text-neutral-100">
    {children}
  </h2>
);

const StatsPage = () => {
  const chaptersRead = useProgressStore((state) => state.chaptersRead);
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const [chapters, setChapters] = useState(null);

  useEffect(() => {
    fetchChapterNames().then(setChapters).catch(() => {});
  }, []);

  const stats = useMemo(() => {
    if (!chapters) return null;
    const all = [...chapters.values()];
    let totalRead = 0;
    const completed = [];
    const inProgress = [];
    all.forEach((chapter) => {
      const read = Math.min(chaptersRead[String(chapter.id)] || 0, chapter.verses_count);
      totalRead += read;
      if (read >= chapter.verses_count) completed.push(chapter);
      else if (read > 0) inProgress.push({ chapter, read });
    });
    inProgress.sort((a, b) => b.read / b.chapter.verses_count - a.read / a.chapter.verses_count);
    return {
      totalRead,
      percent: Math.min(100, Math.round((totalRead / TOTAL_AYAHS) * 100)),
      completed,
      inProgress,
    };
  }, [chapters, chaptersRead]);

  return (
    <main className="min-h-screen pb-16">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-2 px-4">
          <Link
            to="/"
            aria-label="العودة إلى الفهرس"
            title="العودة إلى الفهرس"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-neutral-400 dark:hover:bg-neutral-900"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="font-display text-xl text-neutral-900 dark:text-neutral-100">إحصائياتي</h1>
          <div className="ms-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 pt-8">
        {!stats ? (
          <p className="py-16 text-center text-sm text-neutral-500">جارٍ التحميل…</p>
        ) : stats.totalRead === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <Sparkles className="h-10 w-10 text-primary-400" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              ما بدأت القراءة بعد — أول آية بتقرأها بتظهر هنا
            </p>
            <Link
              to="/"
              className="min-h-11 rounded-lg border border-primary-500 px-5 leading-[2.75rem] text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-400 dark:hover:bg-neutral-900"
            >
              ابدأ القراءة
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
              <ProgressRing percent={stats.percent} label="من المصحف الشريف" />
              <div className="grid w-full flex-1 grid-cols-1 gap-3 sm:max-w-sm">
                <StatTile icon={LibraryBig} value={stats.totalRead} total={TOTAL_AYAHS} label="آية مقروءة" />
                <StatTile icon={BookCheck} value={stats.completed.length} total={114} label="سورة مكتملة" />
                <StatTile icon={Bookmark} value={bookmarks.length} label="علامة مرجعية" />
              </div>
            </div>

            {stats.completed.length > 0 && (
              <>
                <SectionTitle>السور المكتملة</SectionTitle>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {stats.completed.map((chapter) => (
                    <Link
                      key={chapter.id}
                      to={`/surah/${chapter.id}`}
                      className="flex items-center gap-2 rounded-lg border border-success-500/30 bg-success-500/5 px-3 py-2.5 transition-colors hover:border-success-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success-500" aria-hidden="true" />
                      <span className="truncate font-display text-neutral-900 dark:text-neutral-100">
                        {chapter.name_arabic}
                      </span>
                      <span className="ms-auto text-[0.65rem] text-neutral-500">
                        {toArabicNumber(chapter.verses_count)} آية
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {stats.inProgress.length > 0 && (
              <>
                <SectionTitle>قيد القراءة</SectionTitle>
                <div className="flex flex-col gap-2">
                  {stats.inProgress.map(({ chapter, read }) => (
                    <SurahProgressRow key={chapter.id} chapter={chapter} readCount={read} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default StatsPage;
