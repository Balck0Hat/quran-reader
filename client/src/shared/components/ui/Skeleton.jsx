import { cn } from '../../utils/cn.js';

const Skeleton = ({ className }) => (
  <div
    aria-hidden="true"
    className={cn(
      'animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-900',
      className
    )}
  />
);

export default Skeleton;
