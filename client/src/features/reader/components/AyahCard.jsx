import { memo } from 'react';
import { Play, Pause, BookOpenText, Bookmark } from 'lucide-react';
import { IconButton } from '../../../shared/components/ui/index.js';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';
import { cn } from '../../../shared/utils/cn.js';

const AyahCard = ({
  verse,
  fontSize,
  isPlaying,
  isCurrent,
  isBookmarked,
  onPlay,
  onOpenInsight,
  onToggleBookmark,
}) => (
  <article
    id={`ayah-${verse.verse_number}`}
    data-verse={verse.verse_number}
    className={cn(
      'group rounded-xl px-4 py-5 transition-colors duration-300 sm:px-6',
      isCurrent && 'ayah-playing'
    )}
  >
    <p dir="rtl" className="quran-text text-neutral-900 dark:text-neutral-100" style={{ fontSize }}>
      {verse.text_uthmani}
      <span
        aria-label={`الآية ${toArabicNumber(verse.verse_number)}`}
        className="mx-2 inline-flex h-9 w-9 -translate-y-1 items-center justify-center rounded-full border border-primary-400/70 align-middle font-sans text-xs font-semibold text-primary-700 shadow-[inset_0_0_0_2px_var(--color-neutral-50)] dark:text-primary-400 dark:shadow-[inset_0_0_0_2px_var(--color-neutral-950)]"
      >
        {toArabicNumber(verse.verse_number)}
      </span>
    </p>

    <div className="mt-2 flex items-center gap-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
      <IconButton
        label={isPlaying ? 'إيقاف مؤقت' : 'استماع'}
        active={isCurrent}
        onClick={() => onPlay(verse)}
      >
        {isPlaying ? (
          <Pause className="h-4.5 w-4.5" aria-hidden="true" />
        ) : (
          <Play className="h-4.5 w-4.5" aria-hidden="true" />
        )}
      </IconButton>
      <IconButton
        label="التفسير والمعاني"
        onClick={() => onOpenInsight(verse.verse_key)}
      >
        <BookOpenText className="h-4.5 w-4.5" aria-hidden="true" />
      </IconButton>
      <IconButton
        label={isBookmarked ? 'إزالة العلامة' : 'علامة مرجعية'}
        active={isBookmarked}
        onClick={() => onToggleBookmark(verse.verse_key)}
      >
        <Bookmark
          className={cn('h-4.5 w-4.5', isBookmarked && 'fill-current')}
          aria-hidden="true"
        />
      </IconButton>
    </div>
  </article>
);

export default memo(AyahCard);
