import { cn } from '../../utils/cn.js';

const IconButton = ({
  label,
  active = false,
  className,
  children,
  ...props
}) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className={cn(
      'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full',
      'text-neutral-600 transition-colors duration-200 dark:text-neutral-400',
      'hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-neutral-900 dark:hover:text-primary-400',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-neutral-950',
      'disabled:pointer-events-none disabled:opacity-40',
      active && 'bg-primary-100 text-primary-700 dark:bg-neutral-900 dark:text-primary-400',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
