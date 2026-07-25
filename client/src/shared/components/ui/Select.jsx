import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const Select = ({ label, value, onChange, options, className }) => (
  <label className={cn('flex flex-col gap-1.5', className)}>
    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
      {label}
    </span>
    <span className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'h-11 w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-50 ps-3 pe-9',
          'text-sm text-neutral-900 transition-colors',
          'dark:border-neutral-800 dark:bg-neutral-925 dark:text-neutral-100',
          'hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
      />
    </span>
  </label>
);

export default Select;
