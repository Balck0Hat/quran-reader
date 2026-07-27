import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, Sunrise, Sunset, MoonStar, HandHeart, CircleDotDashed } from 'lucide-react';
import toast from 'react-hot-toast';
import { ThemeToggle } from '../../shared/components/ui/index.js';
import { toArabicNumber } from '../../shared/utils/arabicNumber.js';
import { cn } from '../../shared/utils/cn.js';
import { ADHKAR_CATEGORIES } from './data/index.js';
import { useAdhkarDay } from './hooks/useAdhkarDay.js';
import DhikrCard from './components/DhikrCard.jsx';
import TasbihPanel from './components/TasbihPanel.jsx';

const ICONS = { Sunrise, Sunset, MoonStar, HandHeart };
const TASBIH_TAB = { key: 'tasbih', label: 'المسبحة' };

const defaultCategory = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 19) return 'evening';
  return 'sleep';
};

const AdhkarPage = () => {
  const [active, setActive] = useState(defaultCategory);
  const { counts, increment, resetCategory } = useAdhkarDay();
  const isTasbih = active === TASBIH_TAB.key;
  const category = ADHKAR_CATEGORIES.find((item) => item.key === active) || ADHKAR_CATEGORIES[0];

  const doneCount = useMemo(
    () => category.items.filter((dhikr) => (counts[dhikr.id] || 0) >= dhikr.count).length,
    [category, counts]
  );
  const allDone = doneCount === category.items.length;

  const handleCount = (id, max) => {
    increment(id, max);
    const dhikr = category.items.find((item) => item.id === id);
    if ((counts[id] || 0) + 1 >= dhikr.count) {
      const nowDone = doneCount + 1;
      if (nowDone === category.items.length) {
        toast.success(`ما شاء الله — أتممت ${category.label} 🤍`);
      }
    }
  };

  return (
    <main className="min-h-screen pb-16">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-2 px-4">
          <Link
            to="/"
            aria-label="العودة إلى الفهرس"
            title="العودة إلى الفهرس"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-neutral-400 dark:hover:bg-neutral-900"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="font-display text-xl text-neutral-900 dark:text-neutral-100">الأذكار</h1>
          {!isTasbih && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              · {toArabicNumber(doneCount)} من {toArabicNumber(category.items.length)}
            </span>
          )}
          <div className="ms-auto flex items-center gap-1">
            {!isTasbih && (
              <button
                type="button"
                onClick={() => resetCategory(category.items.map((item) => item.id))}
                aria-label="إعادة تصفير هذا القسم"
                title="إعادة تصفير هذا القسم"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-neutral-400 dark:hover:bg-neutral-900"
              >
                <RotateCcw className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>

        <div role="tablist" aria-label="أقسام الأذكار" className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-4 pb-2">
          {[...ADHKAR_CATEGORIES, TASBIH_TAB].map((item) => {
            const Icon = ICONS[item.icon] || CircleDotDashed;
            return (
              <button
                key={item.key}
                role="tab"
                type="button"
                aria-selected={active === item.key}
                onClick={() => setActive(item.key)}
                className={cn(
                  'inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 text-sm transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  active === item.key
                    ? 'bg-primary-100 font-semibold text-primary-800 dark:bg-primary-950/60 dark:text-primary-300'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900'
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 pt-6">
        {isTasbih ? (
          <TasbihPanel />
        ) : (
          <>
            {allDone && (
              <p className="rounded-xl border border-success-500/40 bg-success-500/5 px-4 py-3 text-center text-sm font-medium text-success-500">
                ما شاء الله — أتممت {category.label} اليوم ✓
              </p>
            )}
            {category.items.map((dhikr) => (
              <DhikrCard
                key={dhikr.id}
                dhikr={dhikr}
                done={counts[dhikr.id] || 0}
                onCount={handleCount}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
};

export default AdhkarPage;
