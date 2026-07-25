import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ErrorState, Skeleton } from '../../shared/components/ui/index.js';
import { useProgressStore } from '../progress/index.js';
import { useReaderStore, FONT_SIZES } from './store/readerStore.js';
import { useReaderMeta } from './hooks/useReaderMeta.js';
import { useVerses } from './hooks/useVerses.js';
import { useAudioPlayer } from './hooks/useAudioPlayer.js';
import { useReadingTracker } from './hooks/useReadingTracker.js';
import ReaderHeader from './components/ReaderHeader.jsx';
import SurahBanner from './components/SurahBanner.jsx';
import AyahCard from './components/AyahCard.jsx';
import AudioBar from './components/AudioBar.jsx';
import InsightDrawer from './components/InsightDrawer.jsx';

const scrollToVerse = (verseNumber) =>
  document
    .getElementById(`ayah-${verseNumber}`)
    ?.scrollIntoView({ block: 'center', behavior: 'smooth' });

const ReaderPage = () => {
  const { chapterId } = useParams();
  const [searchParams] = useSearchParams();
  const { chapter, reciters, tafsirs } = useReaderMeta(chapterId);
  const reciterId = useReaderStore((state) => state.reciterId);
  const fontLevel = useReaderStore((state) => state.fontLevel);
  const { verses, isLoading, isLoadingMore, error, hasMore, loadMore, loadUntil } =
    useVerses(Number(chapterId), reciterId);
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const toggleBookmark = useProgressStore((state) => state.toggleBookmark);
  const savePosition = useProgressStore((state) => state.savePosition);
  const [insightKey, setInsightKey] = useState(null);

  const versesRef = useRef([]);
  const hasMoreRef = useRef(false);
  const pendingIndexRef = useRef(null);
  const startVerseRef = useRef(null);
  const jumpedRef = useRef(false);
  versesRef.current = verses;
  hasMoreRef.current = hasMore;

  const stopRef = useRef(null);
  const stepFrom = useCallback(
    (verseKey, step, stopAtEnd = false) => {
      const list = versesRef.current;
      const index = list.findIndex((v) => v.verse_key === verseKey);
      const target = list[index + step];
      if (target) startVerseRef.current(target);
      else if (step > 0 && hasMoreRef.current) {
        pendingIndexRef.current = index + step;
        loadMore();
      } else if (stopAtEnd) stopRef.current?.();
    },
    [loadMore]
  );

  const { playingKey, isPlaying, playVerse, togglePause, stop } = useAudioPlayer({
    onEnded: (key) => stepFrom(key, 1, true),
  });
  stopRef.current = stop;

  const startVerse = useCallback(
    (verse) => {
      playVerse(verse.verse_key, verse.audio?.url);
      savePosition(Number(chapterId), verse.verse_number);
      scrollToVerse(verse.verse_number);
    },
    [playVerse, savePosition, chapterId]
  );
  startVerseRef.current = startVerse;

  useEffect(() => {
    const index = pendingIndexRef.current;
    if (index !== null && verses[index]) {
      pendingIndexRef.current = null;
      startVerse(verses[index]);
    }
  }, [verses, startVerse]);

  useEffect(() => stop(), [chapterId, reciterId, stop]);

  const initialAyah = Number(searchParams.get('ayah')) || 0;
  useEffect(() => {
    if (jumpedRef.current || isLoading || !initialAyah) return;
    jumpedRef.current = true;
    loadUntil(initialAyah).then(() =>
      requestAnimationFrame(() => scrollToVerse(initialAyah))
    );
  }, [isLoading, initialAyah, loadUntil]);

  useReadingTracker(chapterId, verses.length);

  const sentinelRef = useRef(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: '600px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore, verses.length]);

  return (
    <main className="min-h-screen pb-28">
      <ReaderHeader chapter={chapter} reciters={reciters} tafsirs={tafsirs} />
      <SurahBanner chapter={chapter} />

      <div className="mx-auto max-w-3xl px-2 sm:px-4">
        {isLoading && (
          <div className="flex flex-col gap-4 py-6">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-28" />
            ))}
          </div>
        )}
        {error && !isLoading && (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        )}

        <div className="divide-y divide-neutral-200/70 dark:divide-neutral-900">
          {verses.map((verse) => (
            <AyahCard
              key={verse.verse_key}
              verse={verse}
              fontSize={FONT_SIZES[fontLevel]}
              isCurrent={playingKey === verse.verse_key}
              isPlaying={playingKey === verse.verse_key && isPlaying}
              isBookmarked={bookmarks.includes(verse.verse_key)}
              onPlay={startVerse}
              onOpenInsight={setInsightKey}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>

        <div ref={sentinelRef} aria-hidden="true" />
        {isLoadingMore && <Skeleton className="my-4 h-24" />}
        {!hasMore && !isLoading && verses.length > 0 && (
          <p className="quran-text py-10 text-center text-2xl text-primary-500" aria-hidden="true">
            ۞
          </p>
        )}
      </div>

      <AudioBar
        chapterName={chapter?.name_arabic}
        playingKey={playingKey}
        isPlaying={isPlaying}
        onTogglePause={togglePause}
        onNext={() => stepFrom(playingKey, 1)}
        onPrevious={() => stepFrom(playingKey, -1)}
        onStop={stop}
      />
      <InsightDrawer
        verseKey={insightKey}
        chapterName={chapter ? `سورة ${chapter.name_arabic}` : ''}
        isOpen={Boolean(insightKey)}
        onClose={() => setInsightKey(null)}
      />
    </main>
  );
};

export default ReaderPage;
