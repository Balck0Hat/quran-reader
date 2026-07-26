import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';

const StatTile = ({ icon: Icon, value, total, label }) => (
  <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-925">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-950/50 dark:text-primary-400">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
    <div className="flex flex-col">
      <p className="text-xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
        {toArabicNumber(value)}
        {total != null && (
          <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
            {' '}من {toArabicNumber(total)}
          </span>
        )}
      </p>
      <p className="text-xs text-neutral-600 dark:text-neutral-400">{label}</p>
    </div>
  </div>
);

export default StatTile;
