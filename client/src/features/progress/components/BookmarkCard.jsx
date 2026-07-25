import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Skeleton } from '../../../shared/components/ui/index.js';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';
import { fetchVerseText } from '../services/quranRefs.service.js';

const BookmarkCard = ({ verseKey, chapterName, onRemove }) => {
  const [chapter, verse] = verseKey.split(':').map(Number);
  const [text, setText] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchVerseText(chapter, verse)
      .then((value) => !cancelled && setText(value))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [chapter, verse]);

  return (
    <div className="group relative rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-925 dark:hover:border-primary-800">
      <Link
        to={`/surah/${chapter}/ayah/${verse}`}
        aria-label={`تدبر ${chapterName} الآية ${toArabicNumber(verse)}`}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      />

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-primary-700 dark:text-primary-400">
          {chapterName} · الآية {toArabicNumber(verse)}
        </p>
        <button
          type="button"
          onClick={() => onRemove(verseKey)}
          aria-label="إزالة العلامة"
          title="إزالة العلامة"
          className="relative z-10 -me-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-error-500/10 hover:text-error-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <X className="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </div>

      {failed ? (
        <p className="mt-1 text-sm text-neutral-500">تعذّر تحميل نص الآية</p>
      ) : text ? (
        <p dir="rtl" className="quran-text mt-1 line-clamp-2 text-xl text-neutral-900 dark:text-neutral-100">
          {text}
        </p>
      ) : (
        <Skeleton className="mt-2 h-8" />
      )}
    </div>
  );
};

export default BookmarkCard;
