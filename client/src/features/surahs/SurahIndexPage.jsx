import { useMemo, useState } from 'react';
import { ErrorState } from '../../shared/components/ui/index.js';
import { toArabicNumber } from '../../shared/utils/arabicNumber.js';
import { useProgressStore, WirdCard } from '../progress/index.js';
import { useChapters } from './hooks/useChapters.js';
import HeroHeader from './components/HeroHeader.jsx';
import ContinueCard from './components/ContinueCard.jsx';
import SurahSearch from './components/SurahSearch.jsx';
import SurahGrid from './components/SurahGrid.jsx';

const normalize = (text) =>
  text.replace(/[أإآ]/g, 'ا').replace(/[ًٌٍَُِّْ]/g, '').toLowerCase();

const SurahIndexPage = () => {
  const { chapters, isLoading, error, reload } = useChapters();
  const [search, setSearch] = useState('');
  const lastPosition = useProgressStore((state) => state.lastPosition);
  const chaptersRead = useProgressStore((state) => state.chaptersRead);

  const filtered = useMemo(() => {
    const query = normalize(search.trim());
    if (!query) return chapters;
    return chapters.filter(
      (chapter) =>
        normalize(chapter.name_arabic).includes(query) ||
        chapter.name_simple.toLowerCase().includes(query) ||
        String(chapter.id) === query ||
        toArabicNumber(chapter.id) === query
    );
  }, [chapters, search]);

  const totalRead = useMemo(
    () =>
      chapters.reduce(
        (sum, chapter) =>
          sum +
          Math.min(chaptersRead[String(chapter.id)] || 0, chapter.verses_count),
        0
      ),
    [chapters, chaptersRead]
  );

  const hasStarted =
    lastPosition && (lastPosition.chapter !== 1 || lastPosition.verse > 1);

  return (
    <main className="min-h-screen">
      <HeroHeader totalRead={totalRead} />
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-20 pt-2">
        {hasStarted && (
          <ContinueCard lastPosition={lastPosition} chapters={chapters} />
        )}
        <WirdCard />
        <SurahSearch value={search} onChange={setSearch} />
        {error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : (
          <SurahGrid
            chapters={filtered}
            chaptersRead={chaptersRead}
            isLoading={isLoading}
          />
        )}
      </div>
    </main>
  );
};

export default SurahIndexPage;
