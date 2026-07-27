import { CheckCircle2 } from 'lucide-react';
import { Skeleton } from '../../../shared/components/ui/index.js';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';
import { cn } from '../../../shared/utils/cn.js';
import { useQuranRefsText } from '../hooks/useQuranRefsText.js';

const DhikrCard = ({ dhikr, done, onCount }) => {
  const { passages, failed } = useQuranRefsText(dhikr.quranRefs);
  const isComplete = done >= dhikr.count;
  const remaining = dhikr.count - done;

  return (
    <button
      type="button"
      onClick={() => !isComplete && onCount(dhikr.id, dhikr.count)}
      disabled={isComplete}
      aria-label={
        isComplete
          ? `${dhikr.title || 'الذكر'} — مكتمل`
          : `عدّ — متبقٍ ${toArabicNumber(remaining)}`
      }
      className={cn(
        'w-full rounded-xl border bg-white p-5 text-start shadow-sm transition-all duration-200 dark:bg-neutral-925',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        isComplete
          ? 'border-success-500/40 bg-success-500/5 dark:bg-success-500/5'
          : 'border-neutral-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md active:translate-y-0 active:scale-[0.99] dark:border-neutral-800 dark:hover:border-primary-800'
      )}
    >
      <div className="flex items-center gap-2">
        {dhikr.title && (
          <p className="font-display text-lg text-primary-700 dark:text-primary-400">
            {dhikr.title}
          </p>
        )}
        <span
          className={cn(
            'ms-auto inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full px-2 text-xs font-semibold',
            isComplete
              ? 'text-success-500'
              : 'bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300'
          )}
        >
          {isComplete ? (
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          ) : (
            <>
              {toArabicNumber(done)}/{toArabicNumber(dhikr.count)}
            </>
          )}
        </span>
      </div>

      {dhikr.quranRefs ? (
        failed ? (
          <p className="mt-2 text-sm text-neutral-500">تعذّر تحميل النص</p>
        ) : passages ? (
          <div className="mt-2 flex flex-col gap-2">
            {passages.map((passage) => (
              <p
                key={passage.slice(0, 24)}
                dir="rtl"
                className="quran-text text-xl leading-loose text-neutral-900 dark:text-neutral-100"
              >
                {passage}
              </p>
            ))}
          </div>
        ) : (
          <Skeleton className="mt-2 h-14" />
        )
      ) : (
        <p dir="rtl" className="quran-text mt-2 text-xl leading-loose text-neutral-900 dark:text-neutral-100">
          {dhikr.text}
        </p>
      )}

      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{dhikr.source}</p>
      {!isComplete && (
        <p className="mt-1 text-[0.65rem] text-primary-600/70 dark:text-primary-400/70">
          اضغط البطاقة للعدّ
        </p>
      )}
    </button>
  );
};

export default DhikrCard;
