/**
 * components/admin/StatsCard.jsx
 * Dashboard stat card with icon, value, and label.
 */

export function StatsCard({ label, value, icon, colorClass = 'text-[var(--gold-primary)]', bgClass = 'bg-[rgba(201,146,42,0.15)]', isLoading = false }) {
  return (
    <div className="glass rounded-2xl p-6 hover:bg-[var(--surface-3)] transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>

      {isLoading ? (
        <>
          <div className="h-9 w-20 rounded-lg skeleton mb-2" />
          <div className="h-4 w-24 rounded skeleton" />
        </>
      ) : (
        <>
          <p className={`text-4xl font-black mb-1 ${colorClass}`}>
            {value ?? '—'}
          </p>
          <p className="text-sm text-[var(--ivory-muted)]/50 font-medium">{label}</p>
        </>
      )}
    </div>
  )
}
