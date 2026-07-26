import { Flame, Minus, Plus, CheckCircle2 } from 'lucide-react';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';
import { cn } from '../../../shared/utils/cn.js';
import { useProgressStore } from '../store/progressStore.js';
import { todayKey, computeStreak } from '../utils/wird.js';

const WirdCard = () => {
  const dailyGoal = useProgressStore((state) => state.dailyGoal);
  const dailyLog = useProgressStore((state) => state.dailyLog);
  const setDailyGoal = useProgressStore((state) => state.setDailyGoal);

  const today = dailyLog[todayKey()] || 0;
  const streak = computeStreak(dailyLog, dailyGoal);
  const met = today >= dailyGoal;
  const percent = Math.min(100, Math.round((today / dailyGoal) * 100));

  return (
    <section
      aria-label="الورد اليومي"
      className={cn(
        'mx-auto w-full max-w-2xl rounded-xl border bg-white px-5 py-4 shadow-sm transition-colors dark:bg-neutral-925',
        met
          ? 'border-primary-400/70 dark:border-primary-700/70'
          : 'border-neutral-200 dark:border-neutral-800'
      )}
    >
      <div className="flex items-center gap-2">
        <h2 className="font-display text-lg text-neutral-900 dark:text-neutral-100">
          وردي اليوم
        </h2>
        {streak > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-800 dark:bg-primary-950/60 dark:text-primary-300">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            {toArabicNumber(streak)} {streak === 1 ? 'يوم' : streak === 2 ? 'يومان' : 'أيام'}
          </span>
        )}
        <div className="ms-auto flex items-center gap-1">
          <button
            type="button"
            aria-label="إنقاص الهدف اليومي"
            disabled={dailyGoal <= 5}
            onClick={() => setDailyGoal(Math.max(5, dailyGoal - 5))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-40 dark:hover:bg-neutral-900"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="min-w-14 text-center text-xs text-neutral-600 dark:text-neutral-400">
            الهدف: {toArabicNumber(dailyGoal)}
          </span>
          <button
            type="button"
            aria-label="زيادة الهدف اليومي"
            disabled={dailyGoal >= 300}
            onClick={() => setDailyGoal(Math.min(300, dailyGoal + 5))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-40 dark:hover:bg-neutral-900"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="تقدم ورد اليوم"
          className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-900"
        >
          <div
            className="h-full rounded-full bg-gradient-to-l from-primary-400 to-primary-600 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="shrink-0 text-xs text-neutral-600 dark:text-neutral-400">
          {toArabicNumber(today)} من {toArabicNumber(dailyGoal)} آية
        </p>
      </div>

      {met && (
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-success-500">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          ما شاء الله — أتممت وردك اليوم
        </p>
      )}
    </section>
  );
};

export default WirdCard;
