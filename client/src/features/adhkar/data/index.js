import { MORNING_ADHKAR } from './adhkar.morning.js';
import { EVENING_ADHKAR } from './adhkar.evening.js';
import { SLEEP_ADHKAR, PRAYER_ADHKAR } from './adhkar.other.js';

export const ADHKAR_CATEGORIES = [
  { key: 'morning', label: 'أذكار الصباح', icon: 'Sunrise', items: MORNING_ADHKAR },
  { key: 'evening', label: 'أذكار المساء', icon: 'Sunset', items: EVENING_ADHKAR },
  { key: 'sleep', label: 'أذكار النوم', icon: 'MoonStar', items: SLEEP_ADHKAR },
  { key: 'prayer', label: 'بعد الصلاة', icon: 'HandHeart', items: PRAYER_ADHKAR },
];
