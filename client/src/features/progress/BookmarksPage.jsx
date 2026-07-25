import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookmarkX } from 'lucide-react';
import { ThemeToggle } from '../../shared/components/ui/index.js';
import { toArabicNumber } from '../../shared/utils/arabicNumber.js';
import { useProgressStore } from './store/progressStore.js';
import { fetchChapterNames } from './services/quranRefs.service.js';
import BookmarkCard from './components/BookmarkCard.jsx';

const BookmarksPage = () => {
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const toggleBookmark = useProgressStore((state) => state.toggleBookmark);
  const [chapterNames, setChapterNames] = useState(null);

  useEffect(() => {
    fetchChapterNames().then(setChapterNames).catch(() => {});
  }, []);

  const sorted = useMemo(
    () =>
      [...bookmarks].sort((a, b) => {
        const [ca, va] = a.split(':').map(Number);
        const [cb, vb] = b.split(':').map(Number);
        return ca - cb || va - vb;
      }),
    [bookmarks]
  );

  const nameOf = (verseKey) => {
    const chapterId = Number(verseKey.split(':')[0]);
    const chapter = chapterNames?.get(chapterId);
    return chapter ? `سورة ${chapter.name_arabic}` : `سورة ${toArabicNumber(chapterId)}`;
  };

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
          <h1 className="font-display text-xl text-neutral-900 dark:text-neutral-100">
            العلامات المرجعية
          </h1>
          {sorted.length > 0 && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              · {toArabicNumber(sorted.length)}
            </span>
          )}
          <div className="ms-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 pt-6">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <BookmarkX className="h-10 w-10 text-primary-400" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              ما في علامات مرجعية بعد — أثناء القراءة اضغط أيقونة العلامة
              <br />
              عند أي آية لتحفظها هنا
            </p>
            <Link
              to="/"
              className="min-h-11 rounded-lg border border-primary-500 px-5 leading-[2.75rem] text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-400 dark:hover:bg-neutral-900"
            >
              تصفّح السور
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map((verseKey) => (
              <BookmarkCard
                key={verseKey}
                verseKey={verseKey}
                chapterName={nameOf(verseKey)}
                onRemove={toggleBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BookmarksPage;
