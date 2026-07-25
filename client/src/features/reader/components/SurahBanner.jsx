import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';

const SurahBanner = ({ chapter }) => {
  if (!chapter) return null;

  return (
    <div className="mb-4 flex flex-col items-center gap-4 px-4 pt-8 text-center">
      <div className="relative w-full max-w-md rounded-2xl border border-primary-300/60 bg-white px-6 py-6 shadow-sm dark:border-primary-800/50 dark:bg-neutral-925">
        <span
          aria-hidden="true"
          className="absolute inset-2 rounded-xl border border-primary-200 dark:border-primary-900/60"
        />
        <p className="relative font-display text-3xl text-neutral-900 dark:text-neutral-100">
          سورة {chapter.name_arabic}
        </p>
        <p className="relative mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          {chapter.revelation_place === 'makkah' ? 'مكية' : 'مدنية'} ·{' '}
          {toArabicNumber(chapter.verses_count)} آية
        </p>
      </div>
      {chapter.bismillah_pre && (
        <p className="quran-text text-2xl text-neutral-800 dark:text-neutral-200">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
      )}
      <div className="gold-hairline w-full max-w-xs" aria-hidden="true" />
    </div>
  );
};

export default SurahBanner;
