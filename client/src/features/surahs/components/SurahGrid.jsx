import { Skeleton } from '../../../shared/components/ui/index.js';
import SurahCard from './SurahCard.jsx';

const SurahGrid = ({ chapters, chaptersRead, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }, (_, index) => (
          <Skeleton key={index} className="h-20" />
        ))}
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <span className="text-3xl text-primary-400" aria-hidden="true">
          ﴾ ﴿
        </span>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          لا توجد نتائج مطابقة — جرّب اسماً آخر
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {chapters.map((chapter) => (
        <SurahCard
          key={chapter.id}
          chapter={chapter}
          readCount={chaptersRead[String(chapter.id)] || 0}
        />
      ))}
    </div>
  );
};

export default SurahGrid;
