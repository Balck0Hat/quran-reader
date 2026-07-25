import { Search, X } from 'lucide-react';

const SurahSearch = ({ value, onChange }) => (
  <div className="relative mx-auto w-full max-w-md">
    <Search
      aria-hidden="true"
      className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
    />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => event.key === 'Escape' && onChange('')}
      placeholder="ابحث باسم السورة أو رقمها…"
      aria-label="البحث في السور"
      className="h-12 w-full rounded-xl border border-neutral-200 bg-white ps-11 pe-11 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-800 dark:bg-neutral-925 dark:text-neutral-100"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="مسح البحث"
        className="absolute end-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:hover:bg-neutral-900"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    )}
  </div>
);

export default SurahSearch;
