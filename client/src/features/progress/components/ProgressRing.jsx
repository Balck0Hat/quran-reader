import { toArabicNumber } from '../../../shared/utils/arabicNumber.js';

const SIZE = 148;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ProgressRing = ({ percent, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`${label}: ${toArabicNumber(percent)}٪`}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          className="stroke-neutral-200 dark:stroke-neutral-900"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          className="stroke-primary-500 transition-[stroke-dashoffset] duration-700"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          {toArabicNumber(percent)}٪
        </span>
      </div>
    </div>
    <p className="text-sm text-neutral-600 dark:text-neutral-400">{label}</p>
  </div>
);

export default ProgressRing;
