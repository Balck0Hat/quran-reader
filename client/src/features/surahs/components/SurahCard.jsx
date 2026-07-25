import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';

const SurahCard = ({ chapter, readCount }) => {
  const percent = Math.min(100, Math.round((readCount / chapter.verses_count) * 100));
  const isComplete = readCount >= chapter.verses_count;

  return (
    <Link
      to={`/surah/${chapter.id}`}
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-925 dark:hover:border-primary-800"
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 rotate-45 items-center justify-center rounded-md border border-primary-300 bg-primary-50 transition-colors group-hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-950/40"
      >
        <span className="-rotate-45 text-sm font-semibold text-primary-700 dark:text-primary-400">
          {toArabicNumber(chapter.id)}
        </span>
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="font-display text-xl leading-tight text-neutral-900 dark:text-neutral-100">
          {chapter.name_arabic}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {chapter.revelation_place === 'makkah' ? 'مكية' : 'مدنية'} ·{' '}
          {toArabicNumber(chapter.verses_count)} آية
        </span>
      </span>

      {isComplete && (
        <CheckCircle2
          className="ms-auto h-5 w-5 shrink-0 text-success-500"
          aria-label="سورة مكتملة"
        />
      )}

      {percent > 0 && !isComplete && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-100 dark:bg-neutral-900"
        >
          <span
            className="block h-full bg-primary-500"
            style={{ width: `${percent}%` }}
          />
        </span>
      )}
    </Link>
  );
};

export default SurahCard;
