import { Link } from 'react-router-dom';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';

const SurahProgressRow = ({ chapter, readCount }) => {
  const percent = Math.min(100, Math.round((readCount / chapter.verses_count) * 100));

  return (
    <Link
      to={`/surah/${chapter.id}?ayah=${readCount}`}
      className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:border-primary-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-925 dark:hover:border-primary-800"
    >
      <span className="font-display text-lg text-neutral-900 dark:text-neutral-100">
        {chapter.name_arabic}
      </span>
      <span className="ms-auto text-xs text-neutral-500 dark:text-neutral-400">
        {toArabicNumber(readCount)} من {toArabicNumber(chapter.verses_count)} آية
      </span>
      <span
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`تقدم سورة ${chapter.name_arabic}`}
        className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-900 sm:w-36"
      >
        <span
          className="block h-full rounded-full bg-primary-500"
          style={{ width: `${percent}%` }}
        />
      </span>
      <span className="w-9 text-end text-xs font-semibold text-neutral-700 dark:text-neutral-300">
        {toArabicNumber(percent)}٪
      </span>
    </Link>
  );
};

export default SurahProgressRow;
