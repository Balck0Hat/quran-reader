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

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<SurahIndexPage />} />
        <Route path="/surah/:chapterId" element={<ReaderPage />} />
        <Route path="*" element={<SurahIndexPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
