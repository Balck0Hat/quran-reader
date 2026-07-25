import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  IconButton,
  Skeleton,
  ErrorState,
} from '../../../shared/components/ui/index.js';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';
import { cn } from '../../../shared/utils/cn.js';
import { useInsight } from '../hooks/useInsight.js';
import { useReaderStore } from '../store/readerStore.js';

const TABS = [
  { key: 'tafsir', label: 'التفسير' },
  { key: 'gharib', label: 'غريب القرآن' },
  { key: 'irab', label: 'الإعراب' },
  { key: 'language', label: 'اللغة والبلاغة' },
];

const InsightDrawer = ({ verseKey, chapterName, isOpen, onClose }) => {
  const [tab, setTab] = useState('tafsir');
  const tafsirId = useReaderStore((state) => state.tafsirId);
  const panelRef = useRef(null);
  const { text, source, isLoading, error, retry } = useInsight({
    tab,
    verseKey,
    tafsirId,
    isOpen,
  });

  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.focus();
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const verseNumber = verseKey?.split(':')[1];

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="التفسير والمعاني">
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px]"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-x-0 bottom-0 flex max-h-[82dvh] flex-col rounded-t-2xl border border-neutral-200 bg-neutral-50 shadow-xl outline-none dark:border-neutral-800 dark:bg-neutral-925 sm:inset-y-0 sm:start-0 sm:bottom-auto sm:h-full sm:max-h-none sm:w-[26rem] sm:rounded-none sm:border-y-0 sm:border-s-0"
      >
        <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <p className="font-display text-lg text-neutral-900 dark:text-neutral-100">
            {chapterName} · الآية {toArabicNumber(verseNumber || '')}
          </p>
          <IconButton label="إغلاق" className="ms-auto" onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </IconButton>
        </div>

        <div role="tablist" aria-label="مصادر الشرح" className="flex gap-1 overflow-x-auto border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
          {TABS.map((item) => (
            <button
              key={item.key}
              role="tab"
              type="button"
              aria-selected={tab === item.key}
              onClick={() => setTab(item.key)}
              className={cn(
                'min-h-11 whitespace-nowrap rounded-lg px-3.5 text-sm transition-colors',
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

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isLoading && (
            <div className="flex flex-col gap-3">
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
              <div className="insight-prose">
                {text || 'لا يتوفر محتوى لهذه الآية في هذا المصدر.'}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightDrawer;
