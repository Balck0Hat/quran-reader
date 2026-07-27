import { RotateCcw } from 'lucide-react';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';
import { cn } from '../../../shared/utils/cn.js';
import { useTasbih } from '../hooks/useTasbih.js';

const DHIKR_OPTIONS = [
  'سبحان الله',
  'الحمد لله',
  'الله أكبر',
  'لا إله إلا الله',
  'أستغفر الله',
  'اللهم صلِّ على محمد',
];

const TARGETS = [33, 99, 100, 0];

const RING_SIZE = 232;
const RING_STROKE = 8;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

const TasbihPanel = () => {
  const { count, todayTotal, dhikrIndex, target, tap, setDhikrIndex, setTarget, reset } =
    useTasbih();
  const progress = target > 0 ? count / target : 0;

  return (
    <section aria-label="المسبحة" className="flex flex-col items-center gap-6 py-4">
      <div role="radiogroup" aria-label="اختر الذكر" className="flex flex-wrap justify-center gap-2">
        {DHIKR_OPTIONS.map((dhikr, index) => (
          <button
            key={dhikr}
            type="button"
            role="radio"
            aria-checked={dhikrIndex === index}
            onClick={() => setDhikrIndex(index)}
            className={cn(
              'min-h-11 rounded-full border px-4 text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              dhikrIndex === index
                ? 'border-primary-500 bg-primary-100 font-semibold text-primary-800 dark:bg-primary-950/60 dark:text-primary-300'
                : 'border-neutral-200 text-neutral-600 hover:border-primary-300 dark:border-neutral-800 dark:text-neutral-400'
            )}
          >
            {dhikr}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={tap}
        aria-label={`سبِّح — العدّ الحالي ${toArabicNumber(count)}`}
        className="group relative rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/50"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      >
        <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} aria-hidden="true">
          <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} fill="none" strokeWidth={RING_STROKE} className="stroke-neutral-200 dark:stroke-neutral-900" />
          {target > 0 && (
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              strokeWidth={RING_STROKE}
              strokeLinecap="round"
              className="stroke-primary-500 transition-[stroke-dashoffset] duration-200"
              strokeDasharray={RING_CIRC}
              strokeDashoffset={RING_CIRC * (1 - progress)}
              transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
            />
          )}
        </svg>
        <span className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-white shadow-md transition-transform duration-100 group-active:scale-95 dark:bg-neutral-925">
          <span className="quran-text text-lg text-primary-700 dark:text-primary-400">
            {DHIKR_OPTIONS[dhikrIndex]}
          </span>
          <span className="text-5xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
            {toArabicNumber(count)}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {target > 0 ? `الهدف ${toArabicNumber(target)}` : 'عدّ حر'}
          </span>
        </span>
      </button>

      <div className="flex items-center gap-2" role="radiogroup" aria-label="هدف الجولة">
        {TARGETS.map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={target === value}
            onClick={() => setTarget(value)}
            className={cn(
              'min-h-11 min-w-14 rounded-lg border text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              target === value
                ? 'border-primary-500 bg-primary-100 font-semibold text-primary-800 dark:bg-primary-950/60 dark:text-primary-300'
                : 'border-neutral-200 text-neutral-600 hover:border-primary-300 dark:border-neutral-800 dark:text-neutral-400'
            )}
          >
            {value === 0 ? '∞' : toArabicNumber(value)}
          </button>
        ))}
        <button
          type="button"
          onClick={reset}
          aria-label="تصفير الجولة"
          title="تصفير الجولة"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-neutral-800 dark:text-neutral-400"
        >
          <RotateCcw className="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        مجموع تسبيحك اليوم: <span className="font-semibold text-primary-700 dark:text-primary-400">{toArabicNumber(todayTotal)}</span>
      </p>
    </section>
  );
};

export default TasbihPanel;
