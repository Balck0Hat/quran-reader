import { Play, Pause, SkipForward, SkipBack, Square } from 'lucide-react';
import { IconButton } from '../../../shared/components/ui/index.js';
import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';

const AudioBar = ({
  chapterName,
  playingKey,
  isPlaying,
  onTogglePause,
  onNext,
  onPrevious,
  onStop,
}) => {
  if (!playingKey) return null;
  const verseNumber = playingKey.split(':')[1];

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-primary-300/50 bg-neutral-50/95 backdrop-blur-md dark:border-primary-900/50 dark:bg-neutral-950/95">
      <div className="gold-hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-3xl items-center gap-2 px-4">
        <p className="min-w-0 truncate text-sm text-neutral-700 dark:text-neutral-300">
          <span className="font-display text-base">{chapterName}</span>
          <span className="text-neutral-500 dark:text-neutral-400">
            {' '}· الآية {toArabicNumber(verseNumber)}
          </span>
        </p>
        <div className="ms-auto flex items-center gap-1">
          <IconButton label="الآية السابقة" onClick={onPrevious}>
            <SkipForward className="h-4.5 w-4.5" aria-hidden="true" />
          </IconButton>
          <IconButton
            label={isPlaying ? 'إيقاف مؤقت' : 'متابعة'}
            onClick={onTogglePause}
            className="bg-primary-500 text-neutral-50 hover:bg-primary-600 hover:text-white dark:bg-primary-600 dark:text-neutral-50"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5" aria-hidden="true" />
            )}
          </IconButton>
          <IconButton label="الآية التالية" onClick={onNext}>
            <SkipBack className="h-4.5 w-4.5" aria-hidden="true" />
          </IconButton>
          <IconButton label="إيقاف التلاوة" onClick={onStop}>
            <Square className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default AudioBar;
