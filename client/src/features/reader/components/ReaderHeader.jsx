import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Settings2, AArrowUp, AArrowDown } from 'lucide-react';
import {
  IconButton,
  Select,
  ThemeToggle,
} from '../../../shared/components/ui/index.js';
import { useReaderStore } from '../store/readerStore.js';

const ReaderHeader = ({ chapter, reciters, tafsirs }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { reciterId, tafsirId, setReciterId, setTafsirId, increaseFont, decreaseFont } =
    useReaderStore();

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-16 max-w-3xl items-center gap-2 px-4">
        <Link
          to="/"
          aria-label="العودة إلى الفهرس"
          title="العودة إلى الفهرس"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-600 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-primary-400"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>

        <h1 className="font-display text-xl text-neutral-900 dark:text-neutral-100">
          سورة {chapter?.name_arabic || '…'}
        </h1>

        <div className="ms-auto flex items-center gap-1">
          <Link
            to="/bookmarks"
            aria-label="العلامات المرجعية"
            title="العلامات المرجعية"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-600 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-primary-400"
          >
            <Bookmark className="h-5 w-5" aria-hidden="true" />
          </Link>
          <IconButton label="تصغير الخط" onClick={decreaseFont}>
            <AArrowDown className="h-5 w-5" aria-hidden="true" />
          </IconButton>
          <IconButton label="تكبير الخط" onClick={increaseFont}>
            <AArrowUp className="h-5 w-5" aria-hidden="true" />
          </IconButton>
          <IconButton
            label="الإعدادات"
            active={showSettings}
            aria-expanded={showSettings}
            onClick={() => setShowSettings((value) => !value)}
          >
            <Settings2 className="h-5 w-5" aria-hidden="true" />
          </IconButton>
          <ThemeToggle />
        </div>
      </div>

      {showSettings && (
        <div className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-950">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2">
            <Select
              label="القارئ"
              value={String(reciterId)}
              onChange={setReciterId}
              options={reciters.map((reciter) => ({
                value: String(reciter.id),
                label: `${reciter.translated_name?.name || reciter.reciter_name}${
                  reciter.style ? ` — ${reciter.style}` : ''
                }`,
              }))}
            />
            <Select
              label="التفسير المعتمد"
              value={String(tafsirId)}
              onChange={setTafsirId}
              options={tafsirs.map((tafsir) => ({
                value: String(tafsir.id),
                label: tafsir.name,
              }))}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default ReaderHeader;
