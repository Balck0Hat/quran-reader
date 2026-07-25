import { useState } from 'react';
import DOMPurify from 'dompurify';
import {
  Skeleton,
  ErrorState,
  Select,
} from '../../../shared/components/ui/index.js';
import { cn } from '../../../shared/utils/cn.js';
import { useInsight } from '../hooks/useInsight.js';
import { useReaderStore } from '../store/readerStore.js';

const TABS = [
  { key: 'tafsir', label: 'التفسير' },
  { key: 'gharib', label: 'غريب القرآن' },
  { key: 'irab', label: 'الإعراب' },
  { key: 'language', label: 'اللغة والبلاغة' },
];

const InsightTabs = ({ verseKey, tafsirs }) => {
  const [tab, setTab] = useState('tafsir');
  const tafsirId = useReaderStore((state) => state.tafsirId);
  const setTafsirId = useReaderStore((state) => state.setTafsirId);
  const { text, source, isLoading, error, retry } = useInsight({
    tab,
    verseKey,
    tafsirId,
    isOpen: true,
  });

  return (
    <section aria-label="التفسير والمعاني">
      <div
        role="tablist"
        aria-label="مصادر الشرح"
        className="sticky top-16 z-20 -mx-4 flex gap-1 overflow-x-auto border-b border-neutral-200 bg-neutral-50/95 px-4 py-2 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/95 sm:mx-0 sm:justify-center sm:rounded-xl sm:border sm:dark:border-neutral-800"
      >
        {TABS.map((item) => (
          <button
            key={item.key}
            role="tab"
            type="button"
            aria-selected={tab === item.key}
            onClick={() => setTab(item.key)}
            className={cn(
              'min-h-11 shrink-0 whitespace-nowrap rounded-lg px-4 text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              tab === item.key
                ? 'bg-primary-100 font-semibold text-primary-800 dark:bg-primary-950/60 dark:text-primary-300'
                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-2xl px-1 py-6">
        {tab === 'tafsir' && tafsirs?.length > 0 && (
          <Select
            label="اختر التفسير"
            value={String(tafsirId)}
            onChange={setTafsirId}
            className="mb-5 max-w-xs"
            options={tafsirs.map((tafsir) => ({
              value: String(tafsir.id),
              label: tafsir.name,
            }))}
          />
        )}

        {isLoading && (
          <div className="flex flex-col gap-3" aria-label="جارٍ التحميل">
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
        {error && !isLoading && <ErrorState message={error} onRetry={retry} />}
        {!isLoading && !error && (
          <>
            {source && (
              <p className="mb-3 text-xs font-semibold text-primary-700 dark:text-primary-400">
                {source}
              </p>
            )}
            {text ? (
              <div
                className="insight-prose"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
              />
            ) : (
              <p className="insight-prose">
                لا يتوفر محتوى لهذه الآية في هذا المصدر.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default InsightTabs;
