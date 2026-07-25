import { ThemeToggle } from '../../../shared/components/ui/index.js';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';

const TOTAL_AYAHS = 6236;

const HeroHeader = ({ totalRead }) => {
  const percent = Math.min(100, Math.round((totalRead / TOTAL_AYAHS) * 100));

  return (
    <header className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-900">
      <div className="pattern-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute end-4 top-4 z-10">
        <ThemeToggle />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 pb-10 pt-14 text-center">
        <span className="quran-text text-2xl text-primary-500" aria-hidden="true">
          ۞
        </span>
        <h1 className="font-display text-5xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-6xl">
          رتِّل
        </h1>
        <p className="quran-text text-lg text-primary-700 dark:text-primary-400">
          ﴿ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴾
        </p>
        <p className="max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          اقرأ، استمع، وتدبَّر — مع التفسير والإعراب ومعاني الكلمات
        </p>

        {totalRead > 0 && (
          <div className="mt-4 w-full max-w-sm">
            <div className="mb-1.5 flex items-baseline justify-between text-xs text-neutral-600 dark:text-neutral-400">
              <span>
                قرأت {toArabicNumber(totalRead)} من {toArabicNumber(TOTAL_AYAHS)} آية
              </span>
              <span className="font-semibold text-primary-700 dark:text-primary-400">
                {toArabicNumber(percent)}٪
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="نسبة الإنجاز من المصحف"
              className="h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-900"
            >
              <div
                className="h-full rounded-full bg-gradient-to-l from-primary-400 to-primary-600 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeroHeader;
