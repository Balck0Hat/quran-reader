import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLoader } from '../shared/components/ui/index.js';

const SurahIndexPage = lazy(() =>
  import('../features/surahs/index.js').then((m) => ({
    default: m.SurahIndexPage,
  }))
);
const ReaderPage = lazy(() =>
  import('../features/reader/index.js').then((m) => ({
    default: m.ReaderPage,
  }))
);
const AyahPage = lazy(() =>
  import('../features/reader/index.js').then((m) => ({
    default: m.AyahPage,
  }))
);
const BookmarksPage = lazy(() =>
  import('../features/progress/index.js').then((m) => ({
    default: m.BookmarksPage,
  }))
);
const StatsPage = lazy(() =>
  import('../features/progress/index.js').then((m) => ({
    default: m.StatsPage,
  }))
);

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<SurahIndexPage />} />
        <Route path="/surah/:chapterId" element={<ReaderPage />} />
        <Route path="/surah/:chapterId/ayah/:verseNumber" element={<AyahPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<SurahIndexPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
