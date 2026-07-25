import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';

const ContinueCard = ({ lastPosition, chapters }) => {
  if (!lastPosition) return null;
  const chapter = chapters.find((c) => c.id === lastPosition.chapter);
  if (!chapter) return null;

  return (
    <Link
      to={`/surah/${chapter.id}?ayah=${lastPosition.verse}`}
      className="group mx-auto -mt-6 flex w-full max-w-2xl items-center gap-4 rounded-xl border border-primary-300/60 bg-neutral-50 px-5 py-4 shadow-md shadow-primary-900/5 transition-all duration-200 hover:shadow-lg hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-primary-800/60 dark:bg-neutral-925 dark:shadow-black/30"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-400">
        <BookOpen className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col text-start">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          تابع من حيث توقفت
        </span>
        <span className="font-display text-lg text-neutral-900 dark:text-neutral-100">
          سورة {chapter.name_arabic} · الآية {toArabicNumber(lastPosition.verse)}
        </span>
      </span>
      <span
        className="ms-auto text-primary-500 transition-transform duration-200 group-hover:-translate-x-1"
        aria-hidden="true"
      >
        ←
      </span>
    </Link>
  );
};

export default ContinueCard;
