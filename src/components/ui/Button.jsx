/**
 * components/ui/Button.jsx
 * Reusable button with variants, sizes, loading state, and spinner.
 */

const variants = {
  primary:   'bg-gradient-to-r from-[var(--gold-deep)] to-[var(--gold-primary)] hover:from-[var(--gold-primary)] hover:to-[var(--gold-bright)] text-[var(--surface-1)] shadow-lg shadow-[var(--gold-deep)]/20 active:scale-[0.98]',
  secondary: 'bg-[var(--surface-3)] hover:bg-[var(--surface-3)]/80 text-[var(--ivory)] border border-[var(--surface-border)] hover:border-[var(--gold-primary)]/40',
  danger:    'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white shadow-lg shadow-red-900/30',
  success:   'bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white shadow-lg shadow-emerald-900/30',
  ghost:     'bg-transparent hover:bg-[var(--surface-3)] text-[var(--ivory-muted)] hover:text-[var(--ivory)]',
  accent:    'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-bright)] hover:from-[var(--gold-bright)] hover:to-[var(--gold-primary)] text-[var(--surface-1)] font-bold shadow-lg shadow-[var(--gold-primary)]/20',
}

const sizes = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-6 py-3 text-base',
  lg:  'px-8 py-4 text-lg',
  xl:  'px-10 py-5 text-xl',
  icon: 'p-2',
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

export function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  onClick,
  disabled  = false,
  loading   = false,
  type      = 'button',
  className = '',
  ...props
}) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/40 focus:ring-offset-2 focus:ring-offset-[var(--surface-1)]',
        'active:scale-95',
        variants[variant] || variants.primary,
        sizes[size]        || sizes.md,
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
