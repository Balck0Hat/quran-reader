const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center gap-4 rounded-xl border border-error-500/30 bg-error-500/5 px-6 py-10 text-center">
    <p className="text-sm text-neutral-700 dark:text-neutral-300">
      {message || 'تعذّر تحميل المحتوى'}
    </p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="min-h-11 rounded-lg border border-primary-500 px-5 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-400 dark:hover:bg-neutral-900"
      >
        إعادة المحاولة
      </button>
    )}
  </div>
);

export default ErrorState;
