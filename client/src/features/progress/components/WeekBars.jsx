import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';
import { cn } from '../../../shared/utils/cn.js';
import { dayKeyOffset, todayKey, weekdayName } from '../utils/wird.js';

const BAR_AREA = 96;

const WeekBars = ({ dailyLog, goal }) => {
  const days = Array.from({ length: 7 }, (_, index) => {
    const key = dayKeyOffset(index - 6);
    return { key, count: dailyLog[key] || 0 };
  });
  const scaleMax = Math.max(goal, ...days.map((day) => day.count)) || 1;
  const goalY = (goal / scaleMax) * BAR_AREA;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-925">
      <div className="relative" style={{ height: BAR_AREA }}>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 border-t border-dashed border-neutral-300 dark:border-neutral-700"
          style={{ bottom: goalY }}
        />
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {days.map((day) => (
            <div
              key={day.key}
              className="group relative flex h-full flex-1 items-end justify-center"
              title={`${weekdayName(day.key)}: ${toArabicNumber(day.count)} آية`}
            >
              <div
                role="img"
                aria-label={`${weekdayName(day.key)}: ${toArabicNumber(day.count)} آية`}
                className={cn(
                  'w-6 rounded-t-[4px] transition-all duration-300',
                  day.count >= goal
                    ? 'bg-primary-500'
                    : 'bg-primary-200 dark:bg-primary-950',
                  day.key === todayKey() && 'ring-2 ring-primary-400/50'
                )}
                style={{
                  height: Math.max(day.count > 0 ? 6 : 2, (day.count / scaleMax) * BAR_AREA),
                }}
              />
              <span className="pointer-events-none absolute -top-1 hidden -translate-y-full rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-xs text-neutral-700 shadow-sm group-hover:block dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                {toArabicNumber(day.count)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-between gap-2">
        {days.map((day) => (
          <span
            key={day.key}
            className={cn(
              'flex-1 text-center text-[0.65rem]',
              day.key === todayKey()
                ? 'font-semibold text-primary-700 dark:text-primary-400'
                : 'text-neutral-500 dark:text-neutral-400'
            )}
          >
            {weekdayName(day.key)}
          </span>
        ))}
      </div>
      <p className="mt-3 text-center text-[0.65rem] text-neutral-500 dark:text-neutral-400">
        الخط المتقطع = هدفك اليومي ({toArabicNumber(goal)} آية)
      </p>
    </div>
  );
};

export default WeekBars;
